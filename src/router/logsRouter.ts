import express from 'express'
import LogsContorller from '../controller/logsContorller'

const router = express.Router()

router.get('/', LogsContorller.getLogs)

export default router