import { ApiRuselt } from "../common/apiResult"
import sqlQuery from "../common/sqlQuery"

export default class LogsService {
    static async getLogs() {
        let apiResult = new ApiRuselt()
        try {
            let res = await sqlQuery('SELECT * FROM sql_logs')
            return apiResult.success('成功！').data = res
        } catch (error) {
            return apiResult.failed('失败！').data = error
        }
    }
}