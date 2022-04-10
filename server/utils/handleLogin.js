const db = require('./sqlStatements')
const validateLogin = require('./validateLogin')

async function handleLogin (formUserName, formUserPass, io) {

    let dbUserEntry = await db.getUserByUserName(formUserName)
    let validatedUser = await validateLogin(dbUserEntry, formUserPass, io)

        return validatedUser


}


module.exports = { handleLogin }