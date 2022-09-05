const {listVerification, userVerification, addVerification, changeVerification, delVerification} = require('../verificators/verificators')

async function showList (req,res) {
    try {
        const verification = await listVerification(req)
        res.status(verification.status).json(verification);
    } catch (error) {
        res.status(error.status).json(error)
    }
}

async function showUser (req,res) {
    try {
        const verification = await userVerification(req)
        res.status(verification.status).json(verification);
    } catch (error) {
        res.status(error.status).json(error)
    }
}

async function addUser (req,res) {
    try {
        const verification = await addVerification(req)
        res.status(verification.status).json(verification);
    } catch (error) {
        res.status(error.status).json(error)
    }
}

async function changeUser (req,res){
    try {
        const verification = await changeVerification(req)
        res.status(verification.status).json(verification);
    } catch (error) {
        res.status(error.status).json(error)
    }
}

async function delUser (req,res){
    try {
        const verification = await delVerification(req)
        res.status(verification.status).json(verification);
    } catch (error) {
        res.status(error.status).json(error)
    }
}

module.exports = {showList, addUser, showUser, changeUser, delUser}