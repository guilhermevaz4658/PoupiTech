

async function findAll() {
    return db("users").select('*')
}

export {
    findAll
}