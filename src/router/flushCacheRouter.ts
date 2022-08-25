import express from 'express'
import { ApiRuselt } from '../common/apiResult'
import { _getArticleList } from '../services/articleService'

const router = express.Router()

router.get('/', async (req, res) => {
    await _getArticleList()
    res.send(new ApiRuselt().success('更新缓存成功！'))
})

export default router