// import connection from "../models";
import Hash from '../common/hash'
import { ApiRuselt, StatusCode } from '../common/apiResult'
import config from '../common/config'
import sqlQuery from '../common/sqlQuery'

type Userinfo = {
    username?: string,
    password?: string,
    token?: string
}

export class Auth {
    userinfo: Userinfo
    key: string
    expired: string
    constructor(userinfo: Userinfo, timeout = 7) {
        this.userinfo = userinfo
        this.key = config.SECRET_KEY
        this.expired = (new Date().getTime() + timeout * 24 * 60 * 60 * 1000).toString()
    }

    async createAuth(): Promise<ApiRuselt> {
        let result: any;
        let apiResult = new ApiRuselt()
        try {
            let sql = `SELECT * FROM users WHERE uname = ?`
            result = await sqlQuery(sql, [this.userinfo.username])
            console.log(result)
            if (result.length == 0) {
                return apiResult.failed('用户名或密码错误！')
            } else {
                let password = this.userinfo.password as string;
                let sqlpassword = result[0].password;
                if (Hash.sha256(password) == sqlpassword) {
                    let token = this._createAuth()
                    apiResult.success('登录成功！').setData({ token })
                } else {
                    apiResult.failed('用户名或密码错误！')
                }
            }
        } catch (error) {
            apiResult.failed('数据读取出错')
        } finally {
            return apiResult
        }
    }

    updateAuth(): ApiRuselt {
        let apiResult = this.checkAuth()
        if (apiResult.code == StatusCode.failed) {
            return apiResult
        }
        return apiResult.success('权限更新成功！')
    }

    checkAuth(): ApiRuselt {

        let apiResult = new ApiRuselt()
        if (!this.userinfo.token) {
            return apiResult.failed('权限错误')
        }


        let [header, body, footer] = [...this.userinfo.token!.split('-')]
        let now = new Date().getTime()
        if (now > parseInt(footer)) {
            apiResult.failed('会话超时')
        } else {
            let tkstr = header + this.key + footer
            if (Hash.sha256(tkstr) != body) {
                apiResult.failed('权限错误')
            } else {
                apiResult.success('登录成功！')
                    .setData(this._createAuth(this.userinfo.token))
            }
        }
        return apiResult
    }

    private _createAuth(token?: string): string {
        let header = token ? token.split('-')[0] : this.userinfo.username
        let footer = this.expired
        let tkstr = `${header}${this.key}${footer}`
        let body = Hash.sha256(tkstr)
        return `${header}-${body}-${footer}`
    }
}


export default class AuthService {
    static async createAuth(userinfo: Userinfo) {
        const auth = new Auth(userinfo);
        return await auth.createAuth()
    }
    static updateAuth(userinfo: Userinfo) {
        const auth = new Auth(userinfo);
        return auth.updateAuth()
    }
}