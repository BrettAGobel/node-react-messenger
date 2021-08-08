const mysql = require('mysql2')
require('dotenv').config()


pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    namedPlaceholders: true


})

let connection =




module.exports = { pool }





