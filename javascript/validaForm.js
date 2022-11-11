export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if (validaCep[tipoDeInput]){
        validaCep[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('.contato__input__container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    }else{
        input.parentElement.classList.add('.contato__input__container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput,input)
    }
}
const validaCep = {
    cep:input => buscarCep(input)
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]
const mensagemDeErro={
    nome:{
        valueMissing:'O campo de nome não pode estar vazio.'
    },
    email:{
        valueMissing:'O campo de email não pode estar vazio.',
        typeMismatch:'O email digitado não é válido.'
    },
    assunto:{
        valueMissing:'O campo de assunto não pode estar vazio.'
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo de logradouro não pode estar vazio.'
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.'
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.'
    }
}

function mostraMensagemDeErro(tipoDeInput,input){
    let mensagem = " "
    tiposDeErro.forEach(erro =>{
        if(input.validity[erro]){
            mensagem = mensagemDeErro[tipoDeInput][erro]
        }
    })
    return mensagem
}
//Buscando CEP utilizando uma Api
function buscarCep(input){
    const cep = input.value.replace(/\D/g,'')//trocar o que não for número por vazio
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method:'GET',
        mode:'cors',
        headers:{
            'content-type': 'application/json;charset=utf-8'
        }
    }
    //verificando se o input esta devidamente preenchido
    if(!input.validity.patternMismatch && !input.validity.valueMissing){
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro){
                    input.setCustomValidity('Não foi possível buscar o CEP.')
                    return
                }
                input.setCustomValidity('')
                preencheCamposComCep(data)
                return
                    
            }
        )
    }

}
//Preenchendo os campos de endereço a partir do CEP informado
function preencheCamposComCep(data){
    const logradouro = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    logradouro.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}
    