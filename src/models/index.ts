import mysql from 'mysql'
<<<<<<< HEAD
const connection = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root",
    database: "blog"
});
=======
import { mode, sqldatabase, sqlhost, sqlpassword, sqluser } from '../app';

let sqlObj = {}
console.log(mode)
if (mode == 'dev') {
    sqlObj = {
        host: "localhost",
        user: "root",
        password: "root",
        database: "blog"
    }
} else {
    sqlObj = {
        host: sqlhost,
        user: sqluser,
        password: sqlpassword,
        database: sqldatabase
    }
}
console.log(sqlObj)
const connection = mysql.createConnection(sqlObj);
>>>>>>> fdb13bc (搭建远程推送)

connection.connect()

export default connection