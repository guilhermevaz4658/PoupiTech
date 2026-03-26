import * as service from "../services/users.service.js"

async function getUsers(req, res) {
    try{
        const getUsers = await service.getUserAll()
        res.json(getUsers)   
    } catch (error) {
        res.status(500).json({message: "Erro ao consultar usuários"})
    }
} 

async function getUsersById(req, res) {
    try{
        const userId = await service.getUsersById(req.params.id)
        res.json(userId)   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 

async function createUsers(req, res) {
    try{
        const createUser = await service.createUser(req.body)
        res.json(createUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export {
    getUsers,
    getUsersById,
    createUsers
}