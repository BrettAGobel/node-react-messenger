const jwt = require('jsonwebtoken')
const wS = require('./utils/connectionWS')
// const user1 = require('./utils/connectionWS')
const express = require('express')
require('dotenv').config({path: 'C:\\Users\\brett\\Documents\\random-web-projects\\node-react-messenger\\.env'})
const app = express()
const cors = require('cors')
app.use(cors())

const server = require('http').createServer(app);

const io = require('socket.io')(server, {cors: {
    origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});


const mysql = require('mysql2')
const connection = require('./utils/databaseConnect.js')
const expressPort = process.env.PORT || 3001;
const ioPort = process.env.PORT || 8080
const db = require('./utils/sqlStatements.js')
const post = require('./utils/handlePost')
const bodyParser = require('body-parser')
const login = require('./utils/handleLogin.js')
const logout = require('./utils/handleLogout')
const cookieParser = require('cookie-parser')



// app.listen(expressPort, () => {
//     console.log(`Example apppppp listening at http://localhost:${expressPort}`)
// })

server.listen(expressPort, () => {
    console.log(`listening on http://localhost:${expressPort}`)
})



io.on('connect', socket => {
     wS.chat(io, socket)
})


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

app.post('/validateToken', (req, res) => {
    console.log('you have hit \/validateToken')
    let decoded = jwt.decode(req.body.token)
    let userName = decoded.userName
    // console.log(userName.toString())
    //     // return wS.user1 = userName.toString()


    // jwt.verify(req.body.token, key)
})


app.post('/login/', async (req, res, next) => {
    try {
        let userName = req.body.userName
        let userPass = req.body.password
        let validatedUser = await login.handleLogin(userName, userPass, io)
        if (validatedUser) {
            // console.log(validatedUser.userName)

             // http only cookie:  difficult to deal with cause client can't re-access this cookie after a refresh to determine if someone has already logged
            // res.cookie('authToken', validatedUser.token, {
            //     secure: false, // set to true if your using https
            //     httpOnly: true,
            //     expires: validatedUser.date
            //     socketId: newSocket
            // })


            // res.send({validatedUser, message: 'this seems to work..'})

            res.json({validatedUser: validatedUser})
        }


    } catch (error) {
        console.log(error)
        // res.sendStatus(500)
        res.send({message: 'username does not exist', status: 500})
    }

}

)

app.get('/login', (req, res) => {
    let token = req.cookies['authToken']
    io.use(socket, next => {
        socket.handshake.headers
        // let decodedToken = jwt.decode(req.cookies['authToken'], process.env.ACCESS_TOKEN_SECRET)
        console.log(socket.handshake.headers)
    })

    // chat(io, req)

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

