function romanize(numc) {
  var num = parseInt(numc)
  if (!num) return false
  var digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX'
    ],
    roman = '',
    i = 3
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman
  return Array(+digits.join('') + 1).join('M') + roman
}

function deromanize(str) {
  var str = str.toUpperCase(),
    validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
    token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
    key = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    },
    num = 0,
    m = ''
  if (!(str && validator.test(str))) return false
  while ((m = token.exec(str))) num += key[m[0]]
  return num
}
document.getElementById('numeros').addEventListener('keyup', function () {
  var numromano = romanize(this.value)

  document.getElementById('roman').value = numromano

  var numberCheck = this.value.replace(/[^1-9]/, '')
  if (numberCheck == '') return false
})
document.getElementById('numeros2').addEventListener('keyup', function () {
  var numarabico = deromanize(this.value)

  document.getElementById('arabic').value = numarabico

  var letterCheck = this.value.replace(/[^I-IX]/, '')
  if (letterCheck == '') return false
})
