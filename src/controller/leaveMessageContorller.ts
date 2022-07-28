import { Request, Response } from "express";
import { CommentInfo } from "../services/commentService";
import LeaveMessageService from '../services/leaveMessageService'


export default class LeaveMessageController {
    static async postLeaveMessage(req: Request, res: Response) {
        const commentInfo: CommentInfo = req.body
        let apiResult = await LeaveMessageService.addLeaveMessage(commentInfo)
        res.send(apiResult)
    }
    static async getLeaveMessage(req: Request, res: Response) {
        let apiResult = await LeaveMessageService.getLeaveMessage()
        res.send(apiResult)
    }
}