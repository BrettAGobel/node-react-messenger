const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('./sqlStatements')
const chat = require('../utils/connectionWS')


validateLogin = async (dbUserEntry, formUserPass, io) => {
    let errors = {
        message1: 'incorrect username/password'
    }




    //this is tentative as I currently have no email field.  This will exclude duplicate results of database entries which have identical usernames.  revise later
    let userName = dbUserEntry[0].userName
    let pass = dbUserEntry[0].userPass
    let userId = dbUserEntry[0].userId
    if (formUserPass !== pass) {
        console.log('wrong pass fooo')
        return errors

    } else {

        // console.log(userName)
        let validatedUser = {}
        let d = new Date()
        let tokenPayload = {userName: userName, iat: d.getTime()}
        d.setTime(d.getTime() + 10 * 60 * 1000)
        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET)
        validatedUser.token = accessToken
        validatedUser.date = d
        validatedUser.userName = userName

        // console.log(validatedUser)
        await db.updateLoginStatusIn(userId)
        // await console.log(chat.chat(io, userName))
        return (validatedUser)
        // res.setHeader('auth-token', accessToken.toString())
        // res.cookie('token', accessToken, {
        //             secure: false, // set to true if your using https
        //             httpOnly: true,
        //             expires: d
        //         })
        //         res.redirect('/')
        //
        //     }


    }

}


module.exports =  validateLogin