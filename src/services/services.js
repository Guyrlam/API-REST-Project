const {userState, writeDb} = require('../repository/repository')
const Verification = require('../verificators/verificators') 

async function list(){
    const array = await userState.usersTemp
    let actives = []
    array.forEach((el)=>{
        if(el.active === true){
            actives.push(el)
        }
    })
    return actives
}

async function user(id){
    const array = await userState.usersTemp
    let selected = undefined;
    array.forEach((el)=>{
        if(el.id === Number(id) && el.active === true){
            selected = el;
        };
    })

    return selected
}

async function add(data){
    const array = await userState.usersTemp
    const newUser = {
        "name": data.name,
        "email": data.email,
        "active": true,
        "id": array.length +1
    }
    array.push(newUser)
    writeDb(array)
    return "Usuário adicionado com sucesso!"
}

async function change(data, id){
    const array = await userState.usersTemp
    array.forEach((el)=>{
        if(el.id === Number(id)){
            if(data.name) el.name = data.name
            if(data.email) el.email = data.email
        }
    })
    writeDb(array)
    return "Usuário alterado com sucesso!"
}

async function del(id){
    const array = await userState.usersTemp
    array.forEach((el)=>{
        if(el.id === Number(id)){
            el.active = false
        }
    })
    writeDb(array)
    return "Usuário deletado com sucesso!"
}



module.exports = {list, user, add, change, del, Verification}
