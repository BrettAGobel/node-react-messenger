const db = require('./sqlStatements')
const jwt = require('jsonwebtoken')

require('dotenv').config()



const handleLogout = async (userObj) => {



let user = userObj.user
    let userEntry =  await db.getUserByUserName(user)
    // console.log(`this is who I'm trying to logout: ${userEntry[0]}`)
    let userName = userEntry[0].userName
    let pass = userEntry[0].userPass
    let userId = userEntry[0].userId

    // console.log(pass)


    await db.updateLoginStatusOut(userId)
    let loggedUsers = await db.updateLoginStatusOut(userId)
    console.log(loggedUsers)
    return loggedUsers





    // keep in case i switch back to cookies, which are technically safer
    // const token = await req.cookies['token']
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  async (err, match) => {
    //     if (err) {
    //         res.json({
    //             message: "user is not logged in"
    //         })
    //     } else if (match) {
    //         console.log(match)
    //         const user = await db.getUserByUserName(match)
    //         let userId = `${user[0].userId}`
    //         console.log(userId)
    //         await db.updateLoginStatusOut(userId)
    //
    //     }
    // })
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