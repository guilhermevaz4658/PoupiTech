import { createUserDTO, updateUserDTO } from '../dto/users.dto.js'
import * as repository from '../repository/users.repository.js'
import * as z from 'zod'

async function getUserAll() {
    users = await repository.findAll()
    return users.map(({ senha, ...userWithoutPassword }) => userWithoutPassword)
}

async function getUserById(id) {
    const user = await repository.findUserById(id)
    if (!user) {
        throw new Error("Usuário não encontrado!")
    }

    const { senha, ...userWithoutPassword } = user
    return userWithoutPassword
}

async function createUser(data) {
    const validatedData = createUserDTO.parse(data)
    const existingEmail = await repository.findByEmail(validatedData.email)
    if (existingEmail) {
        throw new Error("Email já cadastrado")
    }
    
    const createdUser = await repository.createUser(validatedData)
    const {senha, ...retornarUser} = createdUser
    return {message: "Usuário criado com sucesso", usuario: retornarUser}
}

async function deleteUser(id){
    const user = await repository.findUserById(id)
    if(!user){
        throw new Error("Usuário não encontrado")
    }
    await repository.deleteUser(id)
    const { senha, ...userWithoutPassword } = user
    return {message: "Usuário deletado com sucesso", usuario: userWithoutPassword}
}

async function updateUser(id, data){
    const user = await repository.findUserById(id)
    if(!user){
        throw new Error("Usuário não encontrado")
    }

    if(!Object.keys(data).length){
        throw new Error("Nenhum dado para atualizar")
    }

    const validatedData = updateUserDTO.parse(data)
    const updatedUser = await repository.updateUser(id, validatedData)
    const { senha, ...retornarUser } = updatedUser
    return retornarUser
}


export {
    getUserAll,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}