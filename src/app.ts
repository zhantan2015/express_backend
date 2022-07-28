const [mode, secret, sqlhost, sqluser, sqlpassword, sqldatabase] = [...process.argv.splice(2)];
export { mode, secret, sqlhost, sqluser, sqlpassword, sqldatabase }

import express from 'express'
import './models'
import router from './router'

console.log({ mode, secret })

const app = express()
const port = 3333



app.use(bodyParser.urlencoded({ extended: true }))
// if (mode === 'dev')
app.all('*', (req, res, next) => {
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers', '*');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', '*');
    next()
})
app.use('/', router)

app.listen(port, () => {
    console.log(`App is running in http://localhost:${port}`)
})
