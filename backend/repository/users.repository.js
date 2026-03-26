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
    return db("usuarios").insert(user).returning("*")
}


export {
    findAll,
    findByEmail,
    createUser,
    findUserById
}