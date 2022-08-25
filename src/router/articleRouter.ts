import express from 'express'
import ArticleController from '../controller/articleController'

const router = express.Router()

// router.post('/', (req, res) => {
//     let apiResult = ArticleController.postArticle
//     res.send(req.body)
// })
router.post('/', ArticleController.postArticle)
router.get('/', ArticleController.getArticle)
router.put('/:aid', ArticleController.putArticle)
router.delete('/:aid', ArticleController.deleteArticle)
export default router