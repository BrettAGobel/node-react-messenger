const jwt = require('jsonwebtoken')
require('dotenv').config()



const user = {
    id: 'blank',
    name: 'blank'
}

const messages =  []
const users = {}

class connectionWS {
    constructor(io, socket, userName) {
        this.io = io
        this.socket = socket
        this.userName = userName


        // socket.on('connection', (socket)=> {
        //     console.log('connection achieved')
        // })

        socket.on('getMessages', () => {
            this.getMessages()
        });
        socket.on('message', value => {
            this.handleChatMessage(value)
        });



    }

    getMessages() {
        messages.forEach(messageObj => {
            this.sendMessage(messageObj)
        })

    }

    sendMessage (message) {
        this.io.sockets.emit('message', message)
    }

    handleChatMessage(value, userName) {
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();

        const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

        const message = {
            user: this.userName,
            socketId: this.socket.id,
            message: value,
            date: currentDate
        }
        messages.push(message)
        console.log(message)
        this.sendMessage(message)

    }


}

async function chat(io, userName) {
    // io.removeAllListeners()
    // await io.use()jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    io.on('connection', (socket) => {

        // console.log(userName)
         return new connectionWS(io, socket, userName)






    })
}

module.exports = chat