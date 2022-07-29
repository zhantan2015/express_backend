import mysql from 'mysql'

import { mode, sqldatabase, sqlhost, sqlpassword, sqluser } from '../app';


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


const connection = mysql.createConnection(sqlOpt);

connection.connect()

export default connection