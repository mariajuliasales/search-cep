const getElement = id => document.getElementById(`${id}`)

const preencherEndereco = resposta => {
  getElement('rua').innerHTML = resposta.logradouro
  getElement('bairro').innerHTML = resposta.bairro
  getElement('cidade').innerHTML = resposta.localidade
  getElement('estado').innerHTML = resposta.uf
}

const pesquisarCep = () => {
  const cep = document.getElementById('cep').value
  const url = `http://viacep.com.br/ws/${cep}/json/`

  fetch(url)
    .then(response => response.json())
    .then(dados => {
      getElement('resposta').style.display = 'flex'
      if (dados.hasOwnProperty('erro')) {
        getElement('estado').innerHTML = 'CEP incorreto!'
      } else {
        preencherEndereco(dados)
      }
    })
    .catch(error => console.error(error)) // so vai ser mostrado se acontecer um erro com o fetch
}

const excluirCard = () => {
  getElement('resposta').style.display = 'none'
  document.getElementById('cep').value = ''
}

getElement('cep').addEventListener('focusout', pesquisarCep)

getElement('button').addEventListener('click', excluirCard)
