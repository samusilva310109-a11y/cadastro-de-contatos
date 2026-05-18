'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato} from "./contatos.js"

async function criarLinhas(contatos) {
    const linha = document.createElement('tr')

    const tdID = document.createElement('td')

    const tdNome = document.createElement('td')
    tdNome.textContent = contatos.nome

    const tdFoto = document.createElement('td')
    tdFoto.textContent = contatos.foto

    const tdAcao = document.createElement('button')

    linha.appendChild(tdID, tdNome, tdFoto, tdAcao)

    return linha
}

async function atualizarTabela() {
    const tableBody = document.getElementById("table-body")
    const urlContatos = await getContatos()

    const linhas = await urlContatos.map(criarLinhas)
    tableBody.replaceChildren(...linhas)
}

atualizarTabela()


