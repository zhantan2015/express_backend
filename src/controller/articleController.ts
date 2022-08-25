import { Request, Response } from "express";
import ArticleService from "../services/articleService";

export default class ArticleController {
    static async getArticle(req: Request, res: Response) {
        let apiResult = await ArticleService.getAllArticles()
        res.send(apiResult)
    }
    static async postArticle(req: Request, res: Response) {
        let apiResult = await ArticleService.addArticle(req.body)
        res.send(apiResult)
    }
    static async putArticle(req: Request, res: Response) {
        const aid = req.params['aid']
        let apiResult = await ArticleService.updateArticle(aid, req.body)
        res.send(apiResult)
    }
    static async deleteArticle(req: Request, res: Response) {
        const aid = req.params['aid']
        let apiResult = await ArticleService.deleteArticle(aid)
        res.send(apiResult)
    }
}