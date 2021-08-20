const connection = require('./databaseConnect').pool
// const mysql = require('mysql')
// import mysql from 'mysql'
// const mysql = mysql
require('dotenv').config({path: 'C:\\Users\\brett\\Documents\\random-web-projects\\node-react-messenger\\.env'})

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

        connection.query('SELECT bin_to_uuid(userId) as userId, userName, userPass FROM users WHERE userName = ?', [userName], (error, rows) => {
            if (error) {
                return reject(error)
            } else if (rows.length <= 0) {
                return reject('username does not exist')
            }

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



messageDb.updateLoginStatusIn = async (userId) => {
        connection.query('UPDATE users SET userLogged = true WHERE uuid_to_bin(?) = userId', [userId], (error, result) => {
            if (error) {
                console.log(error)
        }

})}


messageDb.updateLoginStatusOut = async (userId) => {
    connection.query('UPDATE users SET userLogged = false WHERE uuid_to_bin(?) = userId', [userId], (error, result) => {
        if (error) {
            console.log(error)
        }
    })}



messageDb.postMessage = async  (match, messageText) => {
    connection.query('INSERT INTO messages (messageId, userId, messageText, messageTime) values (uuid_to_bin(uuid()), (select userId from users where userName = ? ), ? ,  now())', [match, messageText], ((error, result) => {
    if (error) {
    console.log(error)
}
    }))
}

module.exports =  messageDb

