import * as service from "../services/users.service.js"
import { ZodError } from "zod"

async function getUsers(req, res) {
    try {
        const users = await service.getUserAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Erro ao consultar usuários" })
    }
}

async function getUsersById(req, res) {
    try {
        const user = await service.getUserById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

async function createUser(req, res) {
    try {
        const user = await service.createUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        if (error instanceof ZodError) {
            const messages = error.issues.map(e => ({
                field: e.path[0],
                message: e.message
            }))
            return res.status(400).json({ errors: messages })
        }
        res.status(500).json({ message: error.message })
    }
}

async function deleteUser(req, res) {
    try {
        const user = await service.deleteUser(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

async function updateUser(req, res) {
    try {
        const updatedUser = await service.updateUser(req.params.id, req.body)
        res.status(200).json(updatedUser)
    } catch (error) {
        if (error instanceof ZodError) {
            const messages = error.errors.map(e => ({
                field: e.path[0],
                message: e.message
            }))
            return res.status(400).json({ errors: messages })
        }
        res.status(500).json({ message: error.message })
    }
}

// NOVO: login
async function loginUser(req, res) {
    try {
        const user = await service.loginUser(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export {
    getUsers,
    getUsersById,
    createUser,
    deleteUser,
    updateUser,
    loginUser
}