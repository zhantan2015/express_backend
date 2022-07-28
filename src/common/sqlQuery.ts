import { MysqlError } from "mysql"
import connection from "../models"
import { routerInfo } from '../router'


export default function (sql: string, values?: any[]) {
    return new Promise<void>((resolve, rejects) => {
        sql = connection.format(sql, values!).replaceAll('?', `''`)

        connection.query(
            connection.format('INSERT sql_logs(url,text) VALUES(?,?)',
                [routerInfo.req.baseUrl, sql])
        )
        connection.query(sql, (err: MysqlError, result: any) => {
            if (err) {
                console.log(err)
                rejects(err)
            }
            else resolve(result)
        })
    })
}