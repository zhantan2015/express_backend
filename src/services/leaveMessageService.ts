import { ApiRuselt } from "../common/apiResult"
import { createId } from "../common/hash"
import sqlQuery from "../common/sqlQuery"
import { CommentInfo } from "./commentService"

export default class LeaveMessageService {
    static async getLeaveMessage() {
        let apiResult = new ApiRuselt()
        try {
            const res = await sqlQuery('SELECT * FROM leave_message ')
            return apiResult.success('获取留言成功！').setData(res)
        } catch (error) {
            return apiResult.failed('获取留言失败！')
        }
    }
    static async addLeaveMessage(commentInfo: CommentInfo) {
        let apiResult = new ApiRuselt()
        let cid = createId()
        let keys = Object.keys(commentInfo)
        let sql = `INSERT INTO leave_message(lmid,${keys.join()})
        VALUES(?,${'?'.repeat(keys.length).split('').join()})`

        try {
            await sqlQuery(sql, [cid, ...Object.values(commentInfo)])
            return apiResult.success('提交评论成功！')
        } catch (error) {
            return apiResult.failed('提交评论失败！')
        }
    }
}