const db = require('./sqlStatements')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const handleLogout = async (req, res) => {

    const token = await req.cookies['token']
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  async (err, match) => {
        if (err) {
            res.json({
                message: "user is not logged in"
            })
        } else if (match) {
            console.log(match)
            const user = await db.getUserByUserName(match)
            let userId = `${user[0].userId}`
            console.log(userId)
            await db.updateLoginStatusOut(userId)

        }
    })
}
    //         let user = userModel.findOne({
    //             where: {
    //                 username: match.Username
    //             }
    //         })
    //         return user
    //     }
    //
    // }).then



module.exports = handleLogout;