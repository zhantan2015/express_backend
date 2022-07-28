import { ApiRuselt } from "../common/apiResult"
import { createId } from "../common/hash"
import sqlQuery from "../common/sqlQuery"

export type CommentInfo = {
    aid?: string
    content: string
    author: string
    email: string
    website: string
    rpid?: string
}

export default class CommentService {
    static async getCommentByAid(aid: string) {
        let apiResult = new ApiRuselt()
        try {
            const res = await sqlQuery('SELECT * FROM comments WHERE aid = ?', [aid])
            return apiResult.success('获取评论成功！').setData(res)
        } catch (error) {
            return apiResult.failed('获取评论失败！').setData(error)
        }
    }
    static async addComment(commentInfo: CommentInfo) {
        let apiResult = new ApiRuselt()
        let cid = createId()
        let keys = Object.keys(commentInfo)
        let sql = `INSERT INTO comments(cid,${keys.join()})
        VALUES(?,${'?'.repeat(keys.length).split('').join()})`

        try {
            await sqlQuery(sql, [cid, ...Object.values(commentInfo)])
            return apiResult.success('提交评论成功！')
        } catch (error) {
            return apiResult.failed('提交评论失败！')
        }
    }
}