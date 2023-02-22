const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sUsuario = document.querySelector('#m-usuario')
const sTitulo = document.querySelector('#m-titulo')
const sData = document.querySelector('#m-data')
const sValor = document.querySelector('#m-valor')
const sPago = document.querySelector('#m-pago')
const btnSalvar = document.querySelector('#btnSalvar')

const content = document.querySelector(".content");
const inputSearch = document.querySelector("input[type='search']");

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sUsuario.value = itens[index].usuario
    sTitulo.value = itens[index].titulo
    sData.value = itens[index].data
    sValor.value = itens[index].valor
    sPago.value = itens[index].pago
    id = index
  } else {
    sUsuario.value = ''
    sTitulo.value = ''
    sData.value = ''
    sValor.value = ''
    sPago.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.usuario}</td>
    <td>${item.titulo}</td>
    <td>${item.data}</td>
    <td>R$ ${item.valor}</td>
    <td>${item.pago}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sUsuario.value == '' || sTitulo.value == '' || sData.value == ''|| sValor.value == '' || sPago.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].usuario = sUsuario.value
    itens[id].titulo = sTitulo.value
    itens[id].data = sData.value
    itens[id].valor = sValor.value
    itens[id].pago = sPago.value
  } else {
    itens.push({'usuario': sUsuario.value, 'titulo': sTitulo.value, 'data': sData.value, 'valor': sValor.value, 'pago': sPago.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

