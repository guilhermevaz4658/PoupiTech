// importar db

async function findAll() {
    return db("usuarios").select('*')
}

async function findUserById(id){
    return db("usuarios").where({id}).first()
}


async function findByEmail(email) {
    return db("usuarios").where({email}).first()
}

async function createUser(user) {
    const [id] = await db("usuarios").insert(user)
    return db("usuarios").where({ id }).first()
}

async function deleteUser(id){
    return db("usuarios").where({id}).del()
}

async function updateUser(id, validatedData) {
    await db("usuarios").where({ id }).update(validatedData)
    return db("usuarios").where({ id }).first()  
}

export {
    findAll,
    findByEmail,
    createUser,
    findUserById,
    deleteUser,
    updateUser
}