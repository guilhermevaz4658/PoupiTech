import { createUserDTO, updateUserDTO } from '../dto/users.dto.js'
import * as repository from '../repository/users.repository.js'
import bcrypt from 'bcrypt'


async function getUserAll() {
    const users = await repository.findAll()
    return users.map(({ senha, ...userWithoutPassword }) => userWithoutPassword)
}

async function getUserById(id) {
    const user = await repository.findUserById(id)
    if (!user) throw new Error("Usuário não encontrado!")
    const { senha, ...userWithoutPassword } = user
    return userWithoutPassword
}

async function createUser(data) {
    const validatedData = createUserDTO.parse(data)

    const existingEmail = await repository.findByEmail(validatedData.email)
    if (existingEmail) throw new Error("Email já cadastrado")

    validatedData.senha = await bcrypt.hash(validatedData.senha, 10)

    const createdUser = await repository.createUser(validatedData)
    const { senha, ...retornarUser } = createdUser
    return { message: "Usuário criado com sucesso", usuario: retornarUser }
}

async function deleteUser(id) {
    const user = await repository.findUserById(id)
    if (!user) throw new Error("Usuário não encontrado")
    await repository.deleteUser(id)
    const { senha, ...userWithoutPassword } = user
    return { message: "Usuário deletado com sucesso", usuario: userWithoutPassword }
}

async function updateUser(id, data) {
    const user = await repository.findUserById(id)
    if (!user) throw new Error("Usuário não encontrado")

    const validatedData = updateUserDTO.parse(data)

    if (validatedData.senha) {
        validatedData.senha = await bcrypt.hash(validatedData.senha, 10)
    }

    const updatedUser = await repository.updateUser(id, validatedData)
    const { senha, ...retornarUser } = updatedUser
    return { message: "Usuário editado com sucesso", usuario: retornarUser }
}

// NOVO: login
async function loginUser(data) {
    const { email, senha } = data

    const user = await repository.findByEmail(email)
    if (!user) throw new Error("Email ou senha inválidos")

    const senhaValida = await bcrypt.compare(senha, user.senha)
    if (!senhaValida) throw new Error("Email ou senha inválidos")

    const { senha: _, ...userWithoutPassword } = user
    return { message: "Login realizado com sucesso", usuario: userWithoutPassword }
}

export {
    getUserAll,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    loginUser
}