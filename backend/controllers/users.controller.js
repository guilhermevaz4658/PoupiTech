import * as service from "../services/users.service.js"
import { ZodError } from "zod"

async function getUsers(req, res) {
    try {
        const getUsers = await service.getUserAll()
        res.status(200).json(getUsers)
    } catch (error) {
        res.status(500).json({ message: "Erro ao consultar usuários" })
    }
}

async function getUsersById(req, res) {
    try {
        const userId = await service.getUserById(req.params.id)
        res.status(200).json(userId)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

async function createUser(req, res) {
    try {
        const createUser = await service.createUser(req.body)
        res.status(201).json(createUser)
    } catch (error) {
        console.log(error)

        if (error instanceof ZodError) {
            const messages = error.issues.map(e => ({
                field: e.path[0],
                message: e.message
            }))

            return res.status(400).json({ errors: messages })
        }

        return res.status(500).json({ message: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        const deleteUser = await service.deleteUser(req.params.id)
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


async function updateUser(req, res) {
    try {
        const { id } = req.params
        const data = req.body

        const updateUser = await service.updateUser(id, data)
        res.status(200).json(updateUser)
    } catch (error) {
        // verifica se é um erro do Zod
        if (error instanceof ZodError) {
            const messages = error.errors.map(e => ({ field: e.path[0], message: e.message }))
            return res.status(400).json({ errors: messages })
        }
        // caso seja outro tipo de erro
        res.status(500).json({ message: error.message })
    }
}

export {
    getUsers,
    getUsersById,
    createUser,
    deleteUser,
    updateUser
}