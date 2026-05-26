'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js"

function criarLinha(contato) {
    const tableBody = document.getElementById('table-body')
    let linha = document.createElement('tr')
    linha.className = 'linha'


    let nomeCell = document.createElement('td')
    nomeCell.textContent = contato.nome

    let picture = document.createElement('img')
    picture.src = contato.foto
    picture.width = '40'

    let pictureCell = document.createElement('td')
    pictureCell.appendChild(picture)

    let phoneCell = document.createElement('td')
    phoneCell.textContent = contato.celular

    let emailCell = document.createElement('td')
    emailCell.textContent = contato.email

    let enderecoCell = document.createElement('td')
    enderecoCell.textContent = contato.endereco

    let cidadeCell = document.createElement('td')
    cidadeCell.textContent = contato.cidade

    let editAction = document.createElement('button')
    editAction.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>`
    editAction.addEventListener('click', () => atualizarContato(contato.id))

    let deleteAction = document.createElement('button')
    deleteAction.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>` 
    deleteAction.addEventListener('click', () => excluirContato(contato.id))
  
    let actionCell = document.createElement('td')
    actionCell.appendChild(editAction)
    actionCell.appendChild(deleteAction)


    linha.appendChild(nomeCell)
    linha.appendChild(pictureCell)
    linha.appendChild(phoneCell)
    linha.append(emailCell)
    linha.append(enderecoCell)
    linha.append(cidadeCell)
    linha.appendChild(actionCell)


    return linha
}

async function atualizarTabela() {
    const urlContatos = await getContatos()
    console.log(urlContatos);

    const linhas = urlContatos.map(criarLinha)
    console.log(linhas);

    document.getElementById("table-body").replaceChildren(...linhas)
}

function validarCampos() {
    const inpNome = document.getElementById('inp-nome').value.trim()
    const inpCel = document.getElementById('inp-cel').value.trim()
    const inpFoto = document.getElementById('inp-foto').value.trim()
    const inpEmail = document.getElementById('inp-email').value.trim()
    const inpEndereco = document.getElementById('inp-endereco').value.trim()
    const inpCidade = document.getElementById('inp-cidade').value.trim()

    if (!inpNome || !inpCel || !inpFoto || !inpEmail || !inpEndereco || !inpCidade) {
        return false
    }

    return true
}

async function registrarContato() {

    let validar = validarCampos()

    if (!validar) {
        window.alert("Preencha todos os campos")
    }else{
        let contato = {
            nome: document.getElementById('inp-nome').value.trim(),
            celular: document.getElementById('inp-cel').value.trim(),
            foto: document.getElementById('inp-foto').value.trim(),
            email: document.getElementById('inp-email').value.trim(),
            endereco: document.getElementById('inp-endereco').value.trim(),
            cidade: document.getElementById('inp-cidade').value.trim()
        }

        limparCampos()
        await postContato(contato)
        atualizarTabela()
    }

    
}

function limparCampos() {
    const inpNome = document.getElementById('inp-nome').value = ''
    const inpCel = document.getElementById('inp-cel').value = ''
    const inpFoto = document.getElementById('inp-foto').value = ''
    const inpEmail = document.getElementById('inp-email').value = ''
    const inpEndereco = document.getElementById('inp-endereco').value = ''
    const inpCidade = document.getElementById('inp-cidade').value = ''
}

async function excluirContato(id) {
    await deleteContato(id)

    await atualizarTabela()
}

async function atualizarContato(id) {
    let contato = {
        nome: document.getElementById('inp-nome').value.trim(),
        celular: document.getElementById('inp-cel').value.trim(),
        foto: document.getElementById('inp-foto').value.trim(),
        email: document.getElementById('inp-email').value.trim(),
        endereco: document.getElementById('inp-endereco').value.trim(),
        cidade: document.getElementById('inp-cidade').value.trim()
    }

    limparCampos()

    await putContato(id, contato)

    await atualizarTabela()
}
document.getElementById('btn-salvar').addEventListener('click',registrarContato)
atualizarTabela()





