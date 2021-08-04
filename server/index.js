const express = require('express')
const app = express()

const port = process.env.PORT || 3001;

app.get('/messages', (req, res) => {
    try {
        const messages = await getAllMessages()
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