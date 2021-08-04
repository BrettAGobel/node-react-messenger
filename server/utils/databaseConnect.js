import { createPool } from 'mysql'

require('dotenv').config()

const mysql = require('mysql')

async function connect () {

const connection = await createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    namedPlaceholders: true
})

}


export default connect()


