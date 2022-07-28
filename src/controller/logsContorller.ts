import LogsService from "../services/logsService";
import { Request, Response } from 'express'

export default class LogsContorller {
    static async getLogs(req: Request, res: Response) {
        let apiResult = await LogsService.getLogs()
        console.log(apiResult)
        res.send(apiResult)
    }
}