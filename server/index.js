// const mysql = require('mysql2')
// const connection = require('./utils/databaseConnect.js')
// const db = require('./utils/sqlStatements.js')
// const post = require('./utils/handlePost')
// const ioPort = process.env.PORT || 8080



const jwt = require('jsonwebtoken')
const wS = require('./utils/connectionWS')
const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer(app);
const expressPort = process.env.PORT || 3001;
const bodyParser = require('body-parser')
const login = require('./utils/handleLogin.js')
const cookieParser = require('cookie-parser')
const db = require('./utils/sqlStatements')
const jsonParser = bodyParser.json()
app.use(cors())
app.use(jsonParser)
app.use(cookieParser())


const io = require('socket.io')(server, {cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});


async function findSockets () {
    const sockets = await io.fetchSockets()
    sockets.forEach(socket => {
        console.log(socket.id)
    })
}

// original express port
// app.listen(expressPort, () => {
//     console.log(`Example apppppp listening at http://localhost:${expressPort}`)
// })

server.listen(expressPort, () => {
    console.log(`listening on http://localhost:${expressPort}`)
})

/* can apparently attach properties to the socket object.  The seemingly 'traditional' way of using socket io
    is to attach user information on the connection and push it to a user array defined here directly in the server
*/
let loggedPerson = []

function getLoggedUsers () {
    let loggedUsers = db.getAllLoggedUsers()
    // console.log(loggedUsers)
    return loggedUsers
}

io.on('connect', async socket => {

    socket.emit('getUser')
    socket.on('clientUser', async user => {

        let userEntry =  await db.getUserByUserName(user)
        let userId = userEntry[0].userId
        let socketId = socket.id
        await db.updateUserSocket(userId, socketId)
        let users = await getLoggedUsers()
        socket.emit('users', users)

    })

    let users = await getLoggedUsers()
    socket.emit('greeting', {messageText: "welcome to the server", user: 'Server'})
    io.emit('users', users)

    socket.on('message', message => {


        console.log(message)
        console.log(socket.rooms)
        // if (channel) {
        //     io.to()
        // }
        io.to(message.targetRoom).emit('message', message)

    })


    socket.on('logout', async (userObj) => {

        let user = userObj.user
        let userEntry =  await db.getUserByUserName(user)
        let userId = userEntry[0].userId
        let result = await db.updateLoginStatusOut(userId)
        if (result) {

            let loggedUsers = await getLoggedUsers()
            console.log(loggedUsers)
            io.emit('users', loggedUsers)
            io.emit('message', {messageText: 'a user has logged out'})
            io.to(userObj.socketId).emit('logged off')
        }

    })

    socket.on("private message", (privateMessage) => {
        console.log(privateMessage)
        socket.to(privateMessage.socketId).emit("private message", privateMessage
        );
    });

    socket.on('create-room', obj => {

        socket.join(obj.room)
        io.to(obj.room).emit('new-room', obj.room)

    })


})






app.post('/validateToken',  (req, res) => {
    console.log('you have hit \/validateToken')
    console.log(req.body.socketId)
    try {

        jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET)
        res.send({message: 'token is valid'})
    }
    catch (error) {
        return res.send({message: 'token is invalid'})
    }


        findSockets()

        // let socketsArr = io.sockets.connected
        // let allConnectedClients = Object.keys(io.sockets.connected)
        // console.log(allConnectedClients)

}
)


app.post('/login/', async (req, res, next) => {
    try {
        let userName = req.body.userName
        let userPass = req.body.password
        let validatedUser = await login.handleLogin(userName, userPass, io)
        if (validatedUser) {
            // loggedPerson.push(validatedUser)
            // console.log(`Is this array updating with: ${loggedPerson[0].userName}`)
            // console.log(validatedUser.userName)
            // http only cookie:  difficult to deal with cause client can't re-access this cookie after a refresh to determine if someone has already logged
            // correction: Client doesn't need to access cookie, only needs to know that on refresh it always sends a request to /validate.  If /validate returns true then can prove user was already logged
            // res.cookie('authToken', validatedUser.token, {
            //     secure: false, // set to true if your using https
            //     httpOnly: true,
            //     expires: validatedUser.date,
            //
            // })

            res.send({validatedUser, message: 'this seems to work..'})

        }

    } catch (error) {
        console.log(error)
        // res.sendStatus(500)
        res.send({message: 'username does not exist', status: 500})
    }

})


// logout route not at all complete.  Don't know if I even really need to store a logged in variable in my table.  Do know that if logout happens Client needs to eliminate the token or I need to keep track of old tokens here somehow and invalidate them.


app.get('/usersLogged', (async (req, res) => {

        let loggedUsers = await db.getAllLoggedUsers()

        console.log(loggedUsers)
        // console.log(loggedUsers[0].userName)
    res.send(loggedUsers)

    })


)


// app.post('/logout', async (req, res) => {
//     try {
//         // console.log(req.body.socketId)
//         await handleLogout(req)
//         // await logout(req)
//         let users = await getUsers()
//         // console.log(users)
//         io.emit('users', users)
//         res.send({message: 'logged out'})
//     } catch (error) {
//         console.log(error)
//     }
// })

//I think this was a method I was trying to use to grab headers I set on the original socket http request.  Good to remember that depending on the situation you can send that request with additional information

// app.get('/login', (req, res) => {
//     let token = req.cookies['authToken']
//     io.use(socket, next => {
//         socket.handshake.headers
//         // let decodedToken = jwt.decode(req.cookies['authToken'], process.env.ACCESS_TOKEN_SECRET)
//         console.log(socket.handshake.headers)
//     })
//
//     // chat(io, req)
//
// })

// old route that I was using when I was trying to do live messaging over http :/

// app.post('/messages', async (req, res) => {
//     try {
//         let message = req.body.value
//         let response = await post(req, res)
//         let results = await db.getAllMessages()
//         res.json(results)
//     } catch (error) {
//         console.log(error)
//     }
// } )

app.get('/api', (req, res) => {
    res.json({message: "Hello from the server, are you ready to make a messaging app?"})
})

