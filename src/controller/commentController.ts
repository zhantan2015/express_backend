import { Request, Response } from "express";
import CommentService, { CommentInfo } from "../services/commentService";

export default class CommentContorller {
    static async postComment(req: Request, res: Response) {
        const commentInfo: CommentInfo = req.body
        let apiResult = await CommentService.addComment(commentInfo)
        res.send(apiResult)
    }
    static async getCommentByAid(req: Request, res: Response) {
        const aid = req.params['aid']
        let apiResult = await CommentService.getCommentByAid(aid)
        res.send(apiResult)
    }
}