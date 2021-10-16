const db = require('./sqlStatements')
const passValidation = require('./validateLogin')

async function handleLogin (formUserName, formUserPass, io) {

    let dbUserEntry = await db.getUserByUserName(formUserName)
    let validatedUser = await passValidation(dbUserEntry, formUserPass, io)

        return validatedUser


}


module.exports = { handleLogin }