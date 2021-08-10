const express = require('express')
require('dotenv').config({path: 'C:\\Users\\brett\\Documents\\random-web-projects\\node-react-messenger\\.env'})
const app = express()
const mysql = require('mysql2')
const connection = require('./utils/databaseConnect.js')
const port = process.env.PORT || 3001;
const db = require('./utils/sqlStatements.js')
const post = require('./utils/validateLogin')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
app.use(jsonParser)

// databaseConnection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password:  process.env.DB_PASS,
//     database: process.env.MYSQL_DATABASE,
//     connectionLimit: 10,
//     waitForConnections: true,
//     namedPlaceholders: true
//
//
// })


app.get('/messages', async (req, res) => {
    try {
        let results = await db.getAllMessages()
        res.json(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    // res.json({data: getAllMessages.then(res => res.json({}))})

})

app.post('/login/', async (req, res) => {
    try {
        let userName = req.body.userName
        console.log(userName)
        let results = await db.getUserByUserName(userName)
        console.log(results)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})



// app.get('/messages', (req, res) => {
//
//         connection.databaseConnection.getConnection(((err, connection) => {
//
//             connection.query('SELECT * FROM messages', (error, result) => {
//                 if (error) throw error;
//                 return result
//
//             })
//         }))
// })

app.post('/messages', (req, res) => {

} )

app.get('/api', (req, res) => {
    res.json({message: "Hello from the server, are you ready to make a messaging app?"})
})

app.listen(port, () => {
    console.log(`Example apppppp listening at http://localhost:${port}`)
})