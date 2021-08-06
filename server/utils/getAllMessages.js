
// const mysql = require('mysql')
// import mysql from 'mysql'
// const mysql = mysql

export async function getAllMessages() {
    try {

        const mySqlQuery = "SELECT BIN_TO_UUID(messageId) AS messageId, BIN_TO_UUID(userId) as userId, messageText, messageTime FROM messages"


        // const [rows] = await connect.query(mySqlQuery)
        // return [rows]
    } catch (error) {
        console.log(error)
        return undefined
    }
}