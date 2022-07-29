import { ApiRuselt, StatusCode } from "../common/apiResult"
import { createId } from "../common/hash"
import sqlQuery from "../common/sqlQuery"

export type ArticleInfo = {
    title: string,
    content: string,
    acid?: string,
    tags?: string[]
}

async function _getArticleList() {
    let apiRuselt = new ApiRuselt()
    let sql = `SELECT a.aid,a.title,a.content,a.create_date,ac.acname 
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
        apiRuselt.success('获取所有文章成功！')
        apiRuselt.data = res

        redisClient.setEx('articleList', 3600, JSON.stringify(res))
    } catch (error) {
        apiRuselt.failed('出现错误！')
    } finally {
        return apiRuselt
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

            if (articleInfo.tags && articleInfo.tags.length > 0) {
                // 遍历 tags 分别添加 tag 表和 a_at 表
                for (let t of articleInfo.tags) {
                    let sql = 'INSERT INTO article_tags(atid,atname) ' +
                        'SELECT ?,? FROM dual WHERE NOT EXISTS ' +
                        '(SELECT * FROM article_tags WHERE atname = ?)'
                    await sqlQuery(sql, [createId(), t, t])
                    let atid = await sqlQuery(
                        'SELECT atid FROM article_tags WHERE atname = ?', [t]
                    ) as any
                    atid = atid[0]['atid']
                    console.log(atid)
                    await sqlQuery('INSERT a_at(aid,atid) VALUES(?,?)', [aid, atid])
                }
            }
            apiResult.success('创建文章成功！')

            // 这里更新一下缓存
            _getArticleList()
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
}