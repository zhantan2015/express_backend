import express from 'express'
import articleRouter from './articleRouter'
import authRouter from './authRouter'
import categoryRouter from './categoryRouter'
import rootRouter from './rootRouter'
import { AuthenticationRouter } from '../common/config'
import authentication from '../middlewares/authentication'
import userRouter from './userRouter'
import logsRouter from './logsRouter'
import commentRouter from './commentRouter'
import leaveMessageRouter from './leaveMessageRouter'

export const routerInfo = {
    req: '' as any
}

const router = express.Router()
router.all('*', (req, res, next) => {
    routerInfo.req = req
    if (AuthenticationRouter[req.method].includes(req.path)) {
        authentication(req, res, next)
        return
    }
    next()
})

router.use('/', rootRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/article', articleRouter)
router.use('/logs', logsRouter)
router.use('/comment', commentRouter)
router.use('/leave-message', leaveMessageRouter)

router.use('/flush-cache', flushCacheRouter)

export default router;