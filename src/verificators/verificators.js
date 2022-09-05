const {list, user, add, change, del} = require('../services/services')

async function listVerification(data){
    obj = {};

    if(!data){
        obj.status = 404;
        obj.message = "Não foi possível encontrar a lista de usuários" 
        throw obj
    }
    
    obj.status = 200;
    obj.message = "Lista de usuários encontrada com sucesso"
    obj.data = await list()
    return obj
}

async function userVerification(data){
    obj = {};
    let selected = await user(data.params.id);

    if(!data || selected === undefined){
        obj.status = 400;
        obj.message = "Não foi possível encontrar o usuário solicitado" 
        throw obj
    }
    
    obj.status = 200;
    obj.message = "Usuário encontrado com sucesso!"
    obj.data = selected
    return obj
}

async function addVerification(data){
    obj = {};

    if(!data || !data.body.name){
        obj.status = 400;
        obj.message = "Não foi possível adicionar esse usuário pois o nome não foi informado!"
        throw obj
    }else if(!data.body.email){
        obj.status = 400;
        obj.message = "Não foi possível adicionar esse usuário pois o email não foi informado!"
        throw obj
    }
    
    obj.status = 200;
    obj.message = await add(data.body) 
    return obj
}

async function changeVerification(data){
    obj = {};
    let selected = await user(data.params.id);

    if(!data || selected === undefined){
        obj.status = 404;
        obj.message = "Não foi possível encontrar o usuário solicitado" 
        throw obj 
    } else if (!data.body.name && !data.body.email) {
        obj.status = 400;
        obj.message = "Nenhum dado foi enviado!" 
        throw obj
    }
    
    obj.status = 200;
    obj.message = await change(data.body, data.params.id)
    return obj
}

async function delVerification(data){
    obj = {};
    let selected = await user(data.params.id);

    if(!data || selected === undefined){
        obj.status = 404;
        obj.message = "Não foi possível encontrar o usuário solicitado" 
        throw obj
    }
    
    obj.status = 200;
    obj.message = await del(data.params.id)
    return obj
}

module.exports = {listVerification, userVerification, addVerification, changeVerification, delVerification}