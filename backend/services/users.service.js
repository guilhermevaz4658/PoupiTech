import * as repository from '../repository/users.repository.js'

async function getUserAll() {
    return await repository.findAll()
}

async function getUserById(id) {
    const user = await repository.findUserByID(id)
    if (!user) {
        throw new Error("Usuário não encontrado!")
    }

    return user
}

async function createUser(data) {
    const { nome, email, senha } = data
    const existingEmail = await repository.findByEmail(email)
    if (existingEmail) {
        throw new Error("Email já cadastrado")
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw new Error("Email inválido")
    }
    if (!nome || !email || !senha) {
        throw new Error("Erro ao criar usuário: Nome, Email e Senha são obrigatórios!")
    }
    if (senha.length < 5) {
        throw new Error("Senha deve conter 5 caracteres ou mais")
    }

    const user = {
        nome,
        email,
        senha
    }

    return await repository.createUser(user)
}




export {
    getUserAll,
    getUserById,
    createUser
}