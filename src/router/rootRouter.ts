import express from 'express'
import pool from '../models'

const router = express.Router();

router.get('/', (req, res) => {
    const result = pool.config.connectionConfig.host?.slice(-6)
    res.send(`<h2>hello ${result}!!!</h2>`);
})

export default router;