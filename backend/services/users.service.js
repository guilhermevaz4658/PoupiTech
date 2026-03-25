import * as repository from '../repository/users.repository.js'

async function getUserAll(){
    return await repository.findAll()
}





export {
    getUserAll
}