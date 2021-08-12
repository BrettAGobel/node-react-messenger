const db = require('./sqlStatements')
const passValidation = require('./validateLogin')

async function handleLogin (formUserName, formUserPass) {
    let dbUserEntry = await db.getUserByUserName(formUserName)
    let validationResult = await passValidation(dbUserEntry, formUserPass)

        return validationResult


}


module.exports = { handleLogin }