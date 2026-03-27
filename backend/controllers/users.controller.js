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
        const userId = await service.getUserById(req.params.id)
        res.json(userId)   
    } catch (error) {
        res.status(404).json({message: error.message})
    }
} 

async function createUser(req, res) {
    try{
        const createUser = await service.createUser(req.body)
        res.json(createUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteUser(req, res) {
    try{
        const deleteUser = await service.deleteUser(req.params.id)
        res.json(deleteUser)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


async function updateUser(req, res) {
    try {
        const { id } = req.params
        const data = req.body
        
        const updateUser = await service.updateUser(id, data)
        res.json(updateUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export {
    getUsers,
    getUsersById,
    createUser,
    deleteUser,
    updateUser
}