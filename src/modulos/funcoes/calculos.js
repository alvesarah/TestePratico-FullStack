const retornaDVModulo10 = (campo) => {
  const arrayDeNumeros = retornaArrayNumeros(campo)
  const numerosMultiplicados = retornaMultiplicacaoDosNumeros(arrayDeNumeros)
  const somaTotalDoCampo = retornaSomaTotalDoCampo(numerosMultiplicados)

  const resto = somaTotalDoCampo % 10
  const dezena = (Math.floor(somaTotalDoCampo / 10) + 1) * 10
  const DV = (dezena - resto) % 10

  return DV
}

const retornaDVModulo11Titulo = (codeBar) => {
  let codeBarNumbers = retornaArrayNumeros(codeBar)

  let multiplicador = 9
  let contador = codeBarNumbers.length

  while (contador--) {
    multiplicador = multiplicador === 9
      ? 2
      : multiplicador + 1

    codeBarNumbers[contador] = codeBarNumbers[contador] * multiplicador
  }

  const totalSoma = retornaSomaTotalDoCampo(codeBarNumbers)
  const restoDaDivisao = totalSoma % 11

  const digito = 11 - restoDaDivisao

  return [0, 10, 11].includes(digito)
    ? 1
    : digito
}

const retornaDVModulo11Convenio = (campo) => {
  const codeBarNumbers = retornaArrayNumeros(campo)

  let multiplicador = 9  //  Vária entre intervalos de 2 - 9
  let contador = codeBarNumbers.length

  while (contador--) {
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1

    codeBarNumbers[contador] = codeBarNumbers[contador] * multiplicador
  }

  const totalSoma = retornaSomaTotalDoCampo(codeBarNumbers)
  const restoDaDivisao = totalSoma % 11

  if ([0, 1].includes(restoDaDivisao)) {
    return 0
  }

  if (restoDaDivisao === 10) {
    return 1
  }

  const digitoVerificador = 11 - restoDaDivisao

  return digitoVerificador
}


// Funções privadas
const retornaArrayNumeros = (campo) => {
  const campoArray = campo.split('')

  let arrayNumeros = []
  for (var i = 0; i < campoArray.length; i++) {
    arrayNumeros[i] = Number(campoArray[i])
  }

  return arrayNumeros
}

const retornaMultiplicacaoDosNumeros = (numeros) => {
  let multiplicador = 1
  for (var i = numeros.length - 1; i >= 0; i--) {
    multiplicador = multiplicador === 1 ? 2 : 1
    numeros[i] = retornaSomaDosDigitos(numeros[i] * multiplicador)
  }

  return numeros
}

const retornaSomaDosDigitos = (numero) => {
  let output = []
  let sNumber = numero.toString()

  for (var i = 0, len = sNumber.length; i < len; i++) {
    output.push(Number(sNumber.charAt(i)))
  }

  for (var i = 0, soma = 0; i < output.length;) {
    soma += output[i++]
  }

  return soma
}

const retornaSomaTotalDoCampo = (numeros) => {
  let soma = 0

  for (var t = 0; t < numeros.length; t++) {
    soma += numeros[t]
  }

  return soma
}

module.exports = {
  retornaDVModulo10,
  retornaDVModulo11Titulo,
  retornaDVModulo11Convenio
}