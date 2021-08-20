const db = require('./sqlStatements')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function handlePost (req, res) {

    const token = await req.cookies['token']
    const message = req.body.value

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  async (err, match) => {
        if (err) {
            res.json({
                message: "user is not logged in, cannot post message"
            })
        } else if (match) {
            console.log(match)
            console.log(message)
            // const user = await db.getUserByUserNameAlt(match)
            // let userId = `${user[0].userId}`
            // console.log(userId)
            let response = await db.postMessage(match, message)
            return response


        }
    })
}




module.exports = handlePost