import { ApiRuselt, StatusCode } from "../common/apiResult"
import { createId } from "../common/hash"
import sqlQuery from "../common/sqlQuery"
import redisClient from "../common/cache"
import pool from "../models"

export type ArticleInfo = {
    aid?: string,
    title: string,
    content: string,
    acid?: string,
    tags?: string[],
}

export async function _getArticleList() {
    let apiRuselt = new ApiRuselt()
    let sql = `SELECT a.aid,a.title,a.content,a.create_date,ac.acname category
                FROM articles a LEFT JOIN article_category ac
                ON a.acid = ac.acid`
    try {
        let res = await sqlQuery(sql)
        for (let i of res as any) {
            let aid = i['aid']
            let sql = `SELECT at.atname FROM article_tags at
                        JOIN a_at ON a_at.aid = ? 
                        AND a_at.atid = at.atid`
            let tags: any[] = await sqlQuery(sql, [aid]) as any
            i.tags = tags.map(i => Object.values(i)[0])
        }
        apiRuselt.success('获取所有文章成功！').setData(res)

        redisClient.setEx('articleList', 3600, JSON.stringify(res))
    } catch (error) {
        apiRuselt.failed('出现错误！')
    } finally {
        return apiRuselt
    }
}
let timer: any
function flushTimer() {
    if (timer) clearInterval(timer)
    _getArticleList()
    timer = setInterval(_getArticleList, 3666 * 1000)
}

async function setTags(aid: string, tags: string[] | undefined) {
    if (tags && tags.length > 0) {
        // tags 只保留前三个
        tags.splice(3)
        // 清空 a_at 表里跟当前 aid 相关的内容
        await sqlQuery('DELETE FROM a_at WHERE aid = ?', [aid])
        // 遍历 tags 分别添加 tag 表和 a_at 表
        for (let t of tags) {
            let sql = 'INSERT INTO article_tags(atid,atname) ' +
                'SELECT ?,? FROM dual WHERE NOT EXISTS ' +
                '(SELECT * FROM article_tags WHERE atname = ?)'
            await sqlQuery(sql, [createId(), t, t])
            let atid = await sqlQuery(
                'SELECT atid FROM article_tags WHERE atname = ?', [t]
            ) as any
            atid = atid[0]['atid']
            sql = 'INSERT a_at(aid,atid) VALUES(?,?)'
            const res = await sqlQuery(sql, [aid, atid])
        }
    }
}

export default class ArticleService {


    static async addArticle(articleInfo: ArticleInfo) {
        let apiResult = new ApiRuselt()

        let aid = createId()
        // 要先添加article 否则 a_at 表无法关联外键
        let sql = `INSERT articles(aid,title,content,acid) VALUES(?,?,?,?)`
        try {
            await sqlQuery(sql, [aid, articleInfo.title, articleInfo.content, articleInfo.acid])
            await setTags(aid, articleInfo.tags)
            apiResult.success('创建文章成功！')

            // 这里更新一下缓存
            flushTimer()
        } catch (error) {
            apiResult.failed('发生错误！')
        } finally {
            return apiResult
        }


    }

    static async getAllArticles() {
        let apiRuselt = new ApiRuselt()
        if (await redisClient.exists('articleList') == 1) {
            return apiRuselt.success('获取文章列表成功！')
                .setData(JSON.parse(await redisClient.get('articleList') as string))
        } else {
            apiRuselt = await _getArticleList()
            return apiRuselt
        }
    }

    static async updateArticle(aid: string, articleInfo: ArticleInfo) {
        let apiResult = new ApiRuselt()
        const sql = `UPDATE articles SET title=?,content=?,acid=? WHERE aid=?`
        try {
            await sqlQuery(sql, [articleInfo['title']
                , articleInfo['content']
                , articleInfo['acid']
                , aid
            ])
            await setTags(aid, articleInfo.tags)

            apiResult.success('更新文章成功！')
            // 这里更新一下缓存
            flushTimer()
        }
        catch (error) {
            apiResult.failed('更新文章失败！')
        } finally {
            return apiResult
        }
    }
    static async deleteArticle(aid: string) {
        let apiResult = new ApiRuselt()
        let sql = `DELETE FROM articles WHERE aid=?`
        try {
            await sqlQuery(sql, [aid])
            apiResult.success('删除文章成功！')
            flushTimer()
        } catch (error) {
            apiResult.failed('删除文章失败！')
        } finally {
            return apiResult
        }
    }
}