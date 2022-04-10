const connection = require('./databaseConnect').pool
// const mysql = require('mysql')
// import mysql from 'mysql'
// const mysql = mysql


let messageDb = {}

messageDb.getAllMessages = async () => {

        return await new Promise((resolve, reject) => {
            connection.query('SELECT bin_to_uuid(u.userId) as userId, userName, messageText, messageTime FROM users as u JOIN messages as m ON u.userId = m.userId', (error, result) => {
            if (error) {
                console.log(error);
                return reject(error)
            }
                return resolve(result)

            })

        })




}


messageDb.getUserByUserName = async (userName) => {

    return await new Promise( (resolve, reject) => {

        connection.query('SELECT bin_to_uuid(userId) as userId, userName, userPass, userLogged FROM users WHERE userName = ?', [userName], (error, rows) => {
            if (error) {
                return reject(error)
            } else if (rows.length <= 0) {
                return reject('username does not exist')
            }
            // console.log(rows[0])
            return resolve(rows)

        })

    })
}


messageDb.getUserByUserNameAlt = async (userName) => {

    return await new Promise( (resolve, reject) => {

        connection.query('SELECT userId as userId FROM users WHERE userName = ?', [userName], (error, rows) => {
            if (error) {
                return reject(error)
            } else if (rows.length <= 0) {
                return reject('username does not exist')
            }

            return resolve(rows)

        })

    })
}

messageDb.getAllLoggedUsers = async () => {

    return await new Promise( (resolve, reject) => {

        connection.query('SELECT userName, userLogged, userSocket FROM users WHERE userLogged = 1', (error, rows) => {
            if (error) {
                return reject(error).catch(error => {
                    console.log({error: error, message: 'this promise has been rejected'})
                })
            }
            // console.log(rows)
            return resolve(rows)

        })

    })
}





messageDb.updateLoginStatusIn = async (userId) => {

    return await new Promise((resolve, reject) => {

        connection.query('UPDATE users SET userLogged = 1 WHERE uuid_to_bin(?) = userId', [userId], (error, result) => {
            if (error) {
                console.log(error)
                return reject(error)
            } return resolve('complete')

        })
    })

}
messageDb.updateLoginStatusOut = async (userId) => {

    return await new Promise((resolve, reject) => {

        connection.query('UPDATE users SET userLogged = 0 WHERE uuid_to_bin(?) = userId', [userId], (error, result) => {
            if (error) {
                console.log(error)
                return reject(error)
            } return resolve('complete')
        })
    })

    }



messageDb.postMessage = async  (match, messageText) => {
    connection.query('INSERT INTO messages (messageId, userId, messageText, messageTime) values (uuid_to_bin(uuid()), (select userId from users where userName = ? ), ? ,  now())', [match, messageText], ((error, result) => {
    if (error) {
    console.log(error)
}
    }))
}


messageDb.updateUserSocket = async (socketId, userId) => {

    return await new Promise((resolve, reject) => {

        connection.query('UPDATE users SET userSocket = ? WHERE uuid_to_bin(?) = userId', [userId, socketId], (error, result) => {
            if (error) {
                console.log(error)
                return reject(error)
            } return resolve('complete')
        })
    })
}

module.exports =  messageDb

