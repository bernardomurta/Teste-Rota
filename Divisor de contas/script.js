// Variáveis utilizadas para armazenar os itens e as pessoas, além de suas respectivas quantidades
let numPessoas = 1
let numItens = 1
let pessoas = []
let itens = []

// Função adiciona pessoa nos dados
function adicionaPessoa() {
  // Caso não tenha digitado nada no campo "Nome"
  if (document.getElementById('nome').value == '') {
    $('#pessoaadicionada').empty()

    //É adicionado um novo aviso com o nome da pessoa inserida
    let div = document.getElementById('pessoaadicionada')
    div.setAttribute('class', 'aviso')
    let aviso = document.createElement('p')

    aviso.innerHTML = 'Nome vazio'

    div.appendChild(aviso)

    // Caso exista um nome
  } else {
    // É criado um objeto o nome obtido do input e uma conta zerada
    let pessoa = {
      nome: document.getElementById('nome').value,
      conta: 0
    }

    // O objeto é colocado no array
    pessoas.push(pessoa)

    // Chamamos as funções para listar os nomes inseridos na seção de consumidos e gorjeta
    listaNomesDiv()
    listaNomesGorjeta()

    numPessoas++

    // Lembrete falando que o nome da pessoa foi inserido com sucesso
    $('#pessoaadicionada').empty()

    let div = document.getElementById('pessoaadicionada')
    div.setAttribute('class', 'sucesso')
    let aviso = document.createElement('p')

    aviso.innerHTML = pessoa.nome + ' adicionado com sucesso!'

    div.appendChild(aviso)
  }
}

// Adicionamos item na lista de itens com seu valor
function adicionarItem() {
  // Se não for inserido um nome para o consumo, avisamos o usuário
  if (document.getElementById('item').value == '') {
    $('#avisoItem').empty()

    let div = document.getElementById('avisoItem')
    div.setAttribute('class', 'aviso')
    let aviso = document.createElement('p')

    aviso.innerHTML = 'Item vazio'

    div.appendChild(aviso)
  } else {
    // Se não for inserido um valor para o consumo, avisamos o usuário
    if (document.getElementById('preco').value == '') {
      $('#avisoItem').empty()

      let div = document.getElementById('avisoItem')
      div.setAttribute('class', 'aviso')
      let aviso = document.createElement('p')

      aviso.innerHTML = 'Consumo sem preço'

      div.appendChild(aviso)
    } else {
      let cont = 0

      // Verificamos se houve algum nome marcado que consumiu tal produto
      $('.nomesItens').each(function () {
        if (this.checked) {
          cont++
          console.log(cont)
        }
      })

      // Se ninguem marcou um nome, avisamos o usuário
      if (cont == 0) {
        console.log('aqui')
        $('#avisoItem').empty()

        let div = document.getElementById('avisoItem')
        div.setAttribute('class', 'aviso')
        let aviso = document.createElement('p')

        aviso.innerHTML = 'Ninguem vai pagar?'

        div.appendChild(aviso)
      } else {
        // Se estiver tudo certo, continuamos

        // Criamos um objeto para salvarmos o valor
        let item = {
          nome: document.getElementById('item').value,
          valor: document.getElementById('preco').value
        }

        // Variavel em que armazenamos temporariamente os nomes de todos que consumiram aquele item
        let nomes = []

        itens.push(item)

        // Colocamos no objeto o valor
        $('input[type=checkbox]').each(function () {
          if (this.checked) {
            nomes.push(this.value)
          }
        })

        // O valor individual é obtido pela divisão de quantos consumiram o produto pelo valor total
        let valorInd = item.valor / cont

        // Rodamos o vetor de pessoas, verificamos se o nome delas está na lista que consumiram e, caso sim, adicionamos a sua parte no valor da sua conta
        for (let i = 0; i < nomes.length; i++) {
          for (let j = 0; j < pessoas.length; j++) {
            if (nomes[i] === pessoas[j].nome) {
              pessoas[j].conta += valorInd
            }
          }
        }

        // Avisamos o usuário que foi adicionado com sucesso

        $('#avisoItem').empty()

        let div = document.getElementById('avisoItem')
        div.setAttribute('class', 'sucesso')
        let aviso = document.createElement('p')

        aviso.innerHTML = item.nome + ' adicionado com sucesso!'

        div.appendChild(aviso)
      }
    }
  }
}

// Listamos os nomes para imprimir a divisão
function listaNomesDiv() {
  let div = document.getElementById('nomesParaItens')
  let aux = numPessoas - 1
  let br = document.createElement('br')

  //Pegamos o nome digitado
  let checkbox = document.createElement('input')

  // Criamos um checkbox, colocamos seu valor como o nome digitado, e colocamos uma classe
  checkbox.type = 'checkbox'
  checkbox.name = 'nome' + aux
  checkbox.value = pessoas[numPessoas - 1].nome
  checkbox.setAttribute('class', 'nomesItens')

  // Criamos um label para ela com seu nome
  let label = document.createElement('label')
  label.htmlFor = 'nome' + aux
  label.appendChild(document.createTextNode(pessoas[numPessoas - 1].nome))

  // Colocamos ele no HTML
  div.appendChild(checkbox)
  div.appendChild(label)
  div.appendChild(br)
}

// Listamos os nomes para imprimir na gorgeta
function listaNomesGorjeta() {
  let div = document.getElementById('nomes10%')
  let aux = numPessoas - 1
  br = document.createElement('br')

  //Pegamos o nome digitado
  let checkbox = document.createElement('input')

  // Criamos um checkbox, colocamos seu valor como o nome digitado, e colocamos uma classe
  checkbox.type = 'checkbox'
  checkbox.name = 'nome' + aux
  checkbox.value = pessoas[numPessoas - 1].nome
  checkbox.setAttribute('class', 'gorjeta')

  // Criamos um label para ela com seu nome
  let label = document.createElement('label')
  label.htmlFor = 'nome' + aux
  label.appendChild(document.createTextNode(pessoas[numPessoas - 1].nome))

  // Colocamos ele no HTML
  div.appendChild(checkbox)
  div.appendChild(label)
  div.appendChild(br)
}

// Limpamos o input ao clicar em "Nova pessoa"
function limpaCampoNome() {
  document.getElementById('nome').value = ''
}

// Limpamos os input ao clicar em "Novo consumo"
function limpaCampoItem() {
  document.getElementById('item').value = ''
  document.getElementById('preco').value = ''

  $('.nomesItens').each(function () {
    if (this.checked) {
      this.checked = false
    }
  })
}

// Adiciona a gorgeta na conta da pessoa
function adicionaGorjeta() {
  let cont = 0

  let nomes = []

  // Armazenamos os nomes de quem irá pagar gorgeta
  $('.gorjeta').each(function () {
    if (this.checked) {
      cont++
      nomes.push(this.value)
    }
  })

  // Comparamos no array original, se o nome dela está na lista de quem irá pagar
  for (let i = 0; i < nomes.length; i++) {
    for (let j = 0; j < pessoas.length; j++) {
      if (nomes[i] === pessoas[j].nome) {
        // Multiplicamos por 1.1 para a gorgeta de 10%
        pessoas[j].conta = pessoas[j].conta * 1.1
      }
    }
  }
}

// Obtemos do vetor os nomes e os valores a serem pagos
function divisorConta() {
  adicionaGorjeta()

  let pessoaC
  let valor

  // Rodamos o array de pessoa e, para cada, criamos valores e imprimimos seu nome e quanto deverá pagar
  for (let i = 0; i < pessoas.length; i++) {
    let div = document.getElementById('resultados')

    let nome = document.createElement('div')
    nome.setAttribute('class', 'nomeConta')

    let conta = document.createElement('div')
    conta.setAttribute('class', 'valorConta')

    let br = document.createElement('br')

    pessoaC = pessoas[i].nome
    valor = pessoas[i].conta

    nome.innerHTML = pessoaC
    conta.innerHTML = ': R$ ' + valor.toFixed(2)

    div.appendChild(nome)
    div.appendChild(conta)
    div.appendChild(br)
  }

  console.log()
}
