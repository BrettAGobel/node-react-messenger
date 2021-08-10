const connection = require('./databaseConnect').pool
// const mysql = require('mysql')
// import mysql from 'mysql'
// const mysql = mysql
require('dotenv').config({path: 'C:\\Users\\brett\\Documents\\random-web-projects\\node-react-messenger\\.env'})

let messageDb = {}

messageDb.getAllMessages = () => {

        return new Promise((resolve, reject) => {
            connection.query('SELECT bin_to_uuid(u.userId) as userId, userName, messageText, messageTime FROM users as u JOIN messages as m ON u.userId = m.userId', (error, result) => {
            if (error) {
                console.log(error);
                return reject(error)
            }
                return resolve(result)

            })

        })




}


messageDb.getUserByUserName = (userName) => {

    return new Promise( (resolve, reject) => {

        let user = userName
        connection.query('SELECT bin_to_uuid(userId) as userId, userName, userPass FROM users WHERE userName = ?', [userName], (error, result) => {
            if (error) {
                console.log(error);
                return reject(error)
            }
            return resolve(result)

        })

    })




}

module.exports =  messageDb