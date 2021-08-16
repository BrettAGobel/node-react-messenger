const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('./sqlStatements')

validateLogin = async (dbUserEntry, formUserPass) => {
    let errors = {
        message1: 'incorrect username/password'
    }




    //this is tenative as I currently have no email field.  This will exclude duplicate results of database entries which have identical usernames.  revise later

    let pass = dbUserEntry[0].userPass
    let payload = dbUserEntry[0].userName
    let userId = `${dbUserEntry[0].userId}`
    console.log(userId)
    if (formUserPass !== pass) {
        console.log('wrong pass fooo')
        return errors

    } else {
        let success = {}
        let d = new Date()
        d.setTime(d.getTime() + 10 * 60 * 1000)
        console.log('matches!')
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        success.token = accessToken
        success.date = d
        console.log(success)
        await db.updateLoginStatusIn(userId)
        return success
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