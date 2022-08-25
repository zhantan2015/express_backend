import mysql from 'mysql'

const SQLHOST = process.env['SQLHOST'] || 'localhost'
const SQLUSER = process.env['SQLUSER'] || 'root'
const SQLPASSWORD = process.env['SQLPASSWORD'] || 'root'
const SQLDB = process.env['SQLDB'] || 'blog'

const sqlOpt = {
    host: SQLHOST,
    user: SQLUSER,
    password: SQLPASSWORD,
    database: SQLDB
}

const pool = mysql.createPool(sqlOpt)

export default pool