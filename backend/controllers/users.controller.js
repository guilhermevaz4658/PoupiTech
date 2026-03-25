import * as service from "../services/users.service.js"

async function getUsers(req, res) {
    try{
        const users = await service.getUserAll()
        res.json(users)   
    } catch (error) {
        res.status(500).json({message: "Erro ao consultar usuários"})
    }
} 


export {
    getUsers
}