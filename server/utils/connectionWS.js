const jwt = require('jsonwebtoken')
require('dotenv').config()



const user = {
    id: 'blank',
    name: 'blank'
}

let user1 = 'brett'

const messages =  []
// const users = []

class connectionWS {
    constructor(io, socket, user1) {
        this.io = io
        this.socket = socket
        this.userName = user1


        // socket.on('connection', (socket)=> {
        //     console.log('connection achieved')
        // })

        // socket.on('getMessages', () => {
        //     this.getMessages()
        // });
        socket.on('message', messageObj => {
            this.handleChatMessage(messageObj)
        });



    }

    // getMessages() {
    //     messages.forEach(messageObj => {
    //         this.sendMessage(messageObj)
    //     })
    //
    // }

    sendMessage (message) {
        this.io.sockets.emit('message', message)
    }

    handleChatMessage(messageObj, user1) {
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();

        // const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

        const message = {
            user: messageObj.user,
            socketId: this.socket.id,
            message: messageObj.messageText,
            date: currentDate
        }
        messages.push(message)
        console.log(messages)
        console.log(user1)
        this.sendMessage(message)

    }


}

async function chat(io, socket, user1) {
    // io.removeAllListeners()
    // await io.use()jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    io.on('connect', (socket) => {

        return new connectionWS(io, socket, user1)
    })
        //     console.log('new connection')
        // console.log(userName)


}

module.exports = {chat, user1}
