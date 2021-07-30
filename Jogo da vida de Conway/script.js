lista = []
cont = 0
not = 0
for (y = 0; y < 10; y++) {
  lista[y] = []
  for (x = 0; x < 10; x++) {
    lista[y][x] = 0
  }
}
//matriz 10x10

//listaNova = lista; // Isso nao pode ocorrer pois ambas salvam no mesmo espaço de memoria
// lista === listaNova
listaNova = []
for (y = 0; y < 10; y++) {
  listaNova[y] = []
  for (x = 0; x < 10; x++) {
    listaNova[y][x] = 0
  }
}

function proximo() {
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      cont = 0
      not = 0
      try {
        if (lista[y - 1][x - 1] == 1) {
          cont++
        }
      } catch {}
      try {
        if (lista[y - 1][x] == 1) {
          cont++
        }
      } catch {}
      try {
        if (lista[y - 1][x + 1] == 1) {
          cont++
        }
      } catch {}
      try {
        if (lista[y][x - 1] == 1) {
          cont++
        }
      } catch {}
      //jump itself
      try {
        if (lista[y][x + 1] == 1) {
          cont++
        }
      } catch {}
      try {
        if (lista[y + 1][x - 1] == 1) {
          cont++
        }
      } catch {}
      try {
        if (lista[y + 1][x] == 1) {
          cont++
        }
      } catch {}
      try {
        if (lista[y + 1][x + 1] == 1) {
          cont++
        }
      } catch {}

      if (cont < 2) {
        listaNova[y][x] = 0
      }
      if (cont == 2) {
        listaNova[y][x] = lista[y][x]
      }
      if (cont > 3) {
        listaNova[y][x] = 0
      }
      if (cont == 3) {
        listaNova[y][x] = 1
      }
    }
  }

  for (y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      lista[y][x] = listaNova[y][x]
    }
  }

  for (y = 0; y < 10; y++) {
    listaNova[y] = []
    for (x = 0; x < 10; x++) {
      listaNova[y][x] = 0
    }
  }

  gerarBotao()
}

function trocaV(x, y) {
  lista[y][x] == 0 ? (lista[y][x] = 1) : (lista[y][x] = 0)
  gerarBotao()
}

function marcar() {
  x = document.getElementById('x').value
  y = document.getElementById('y').value
  trocaV(x, y)
}

// Graficos

document.body.innerHTML += "<div id='box'>"
box = document.getElementById('box')

function gerarBotao() {
  box.innerHTML = ''
  for (j = 0; j < 10; j++) {
    for (i = 0; i < 10; i++) {
      if (lista[j][i] == 0) {
        box.innerHTML +=
          "<button id = 'botao' valorX = " +
          i +
          ' valorY = ' +
          j +
          " onclick = 'trocaV(" +
          i +
          ',' +
          j +
          ");'></button> "
      } else {
        box.innerHTML +=
          "<button id = 'botao' style = 'background-color:red;' onclick = 'trocaV(" +
          i +
          ',' +
          j +
          ")'></button> "
      }
    }
    box.innerHTML += '<br>'
  }
}

gerarBotao()
