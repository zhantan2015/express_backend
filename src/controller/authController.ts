import { Request, Response } from "express";
import AuthService from "../services/authService"

export default class AuthController {

    static async postAuth(req: Request, res: Response) {
        let userInfo = req.body
        const result = await AuthService.createAuth(userInfo)
        res.send(result)
    }
    static putAuth(req: Request, res: Response) {
        let userInfo = { token: req.headers['x-token'] as string }
        res.send(AuthService.updateAuth(userInfo))
    }
}