const express = require('express')
require('dotenv').config({path: 'C:\\Users\\brett\\Documents\\random-web-projects\\node-react-messenger\\.env'})
const app = express()
const mysql = require('mysql2')
const connection = require('./utils/databaseConnect.js')
const port = process.env.PORT || 3001;
const db = require('./utils/sqlStatements.js')
const post = require('./utils/handlePost')
const bodyParser = require('body-parser')
const login = require('./utils/handleLogin.js')
const logout = require('./utils/handleLogout')
const cookieParser = require('cookie-parser')


const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(cookieParser())

app.get('/messages', async (req, res) => {
    try {
        let results = await db.getAllMessages()
        res.json(results)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

app.post('/login/', async (req, res) => {
    try {
        let userName = req.body.userName

        let userPass = req.body.password
        let results = await login.handleLogin(userName, userPass)
        res.cookie('token', results.token, {
                        secure: false, // set to true if your using https
                        httpOnly: true,
                        expires: results.date
                    })
        res.send({data: results, message: 'this seems to work..'})
    } catch (error) {
        console.log(error)
        // res.sendStatus(500)
        res.send({message: 'username does not exist', status: 500})
    }
})


app.get('/logout', async (req, res) => {
    try {
        // console.log(req.cookies['token'])
        await logout(req)
        res.send({message: 'request to logout received'})
    } catch (error) {
        console.log(error)
    }
})


app.post('/messages', async (req, res) => {
    try {
        let message = req.body.value
        let response = await post(req, res)
        let results = await db.getAllMessages()
        res.json(results)
    } catch (error) {
        console.log(error)
    }
} )

app.get('/api', (req, res) => {
    res.json({message: "Hello from the server, are you ready to make a messaging app?"})
})

app.listen(port, () => {
    console.log(`Example apppppp listening at http://localhost:${port}`)
})