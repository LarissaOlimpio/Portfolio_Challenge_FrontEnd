export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if(input.validity.valid){
        input.parentElement.classList.remove('.contato__input__container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    }else{
        input.parentElement.classList.add('.contato__input__container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput,input)
    }
}


const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
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
