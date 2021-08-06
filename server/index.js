const express = require('express')
require('dotenv').config({path: ''})
const app = express()
const mysql = require('mysql2')
const connection = require('./utils/databaseConnect.js')
const port = process.env.PORT || 3001;

databaseConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASS,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    namedPlaceholders: true


})



app.get('/messages', (req, res) => {
    try {
        databaseConnection.getConnection(((err, connection) => {
            connection.query('SELECT * FROM messages', (e, r,f) => {
                console.log(r)
            })

        }))


    } catch (error) {
        console.log(error)
        return undefined
    }
})

app.post('/messages', (req, res) => {

} )

app.get('/api', (req, res) => {
    res.json({message: "Hello from the server, are you ready to make a messaging app?"})
})

app.listen(port, () => {
    console.log(`Example apppppp listening at http://localhost:${port}`)
})