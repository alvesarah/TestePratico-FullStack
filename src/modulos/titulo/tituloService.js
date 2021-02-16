const { format, addDays } = require('date-fns')
const funcoes = require("../funcoes/calculos")

const validaTitulo = (linhaDigitavel) => {
  const campos = {
    campo1: linhaDigitavel.slice(0, 10),
    campo2: linhaDigitavel.slice(10, 21),
    campo3: linhaDigitavel.slice(21, 32),
    campo4: linhaDigitavel.slice(32, 33),
    campo5: linhaDigitavel.slice(33, 47)
  }

  const posicoesCodigoDeBarras = {
    pos10to19: campos.campo5.slice(4, 14),
    pos20to24: campos.campo1.slice(4, 9),
    pos25to34: campos.campo2.slice(0, 10),
    pos35to44: campos.campo3.slice(0, 10)
  }

  const banco = campos.campo1.slice(0, 3)
  const moeda = campos.campo1.slice(3, 4)
  const vencimento = campos.campo5.slice(0, 4)

  const codeBarNaoValidado =
    banco +
    moeda +
    vencimento +
    posicoesCodigoDeBarras.pos10to19 +
    posicoesCodigoDeBarras.pos20to24 +
    posicoesCodigoDeBarras.pos25to34 +
    posicoesCodigoDeBarras.pos35to44

  const digitosValidados = {
    digito1: funcoes.retornaDVModulo10(campos.campo1.slice(0, 9)),
    digito2: funcoes.retornaDVModulo10(campos.campo2.slice(0, 10)),
    digito3: funcoes.retornaDVModulo10(campos.campo3.slice(0, 10)),
    digito4: funcoes.retornaDVModulo11Titulo(codeBarNaoValidado)
  }

  const digitosVerificadores = {
    digito1: Number(campos.campo1.slice(9, 10)),
    digito2: Number(campos.campo2.slice(10, 11)),
    digito3: Number(campos.campo3.slice(10, 11)),
    digito4: Number(campos.campo4)
  }

  comparaEValidaDigitosVerificadores(digitosValidados, digitosVerificadores)

  const codeBarValidado =
    banco +
    moeda +
    digitosValidados.digito4 +
    vencimento +
    posicoesCodigoDeBarras.pos10to19 +
    posicoesCodigoDeBarras.pos20to24 +
    posicoesCodigoDeBarras.pos25to34 +
    posicoesCodigoDeBarras.pos35to44;

  const valorBoleto = (parseFloat(campos.campo5.slice(4, 14)) / 100).toFixed(2);

  return montaResponseBody(codeBarValidado, valorBoleto, vencimento)
}

// Funções privadas
const comparaEValidaDigitosVerificadores = (digitosValidados, digitosVerificadores) => {
  if (digitosValidados.digito1 !== digitosVerificadores.digito1) {
    throw new Error(
      message = `DV do campo 1 está incorreto! O DV esperado é ${digitosValidados.digito1}, DV recebido é ${digitosVerificadores.digito1}`
    )
  }

  if (digitosValidados.digito2 !== digitosVerificadores.digito2) {
    throw new Error(
      message = `DV do campo 2 está incorreto! O DV esperado é ${digitosValidados.digito2}, DV recebido é ${digitosVerificadores.digito2}`
    )
  }

  if (digitosValidados.digito3 !== digitosVerificadores.digito3) {
    throw new Error(
      message = `DV do campo 3 está incorreto! O DV esperado é ${digitosValidados.digito3}, DV recebido é ${digitosVerificadores.digito3}`
    )
  }

  if (digitosValidados.digito4 !== digitosVerificadores.digito4) {
    throw new Error(
      message = `DV do campo 4 está incorreto! O DV esperado é ${digitosValidados.digito4}, DV recebido é ${digitosVerificadores.digito4}`
    )
  }
}

const montaResponseBody = (codeBarValidado, valorBoleto, vencimento) => {
  const amount = valorBoleto !== '0.00' ? valorBoleto : undefined

  const expirationDate =
    vencimento !== '0000'
      ? format(
        addDays(new Date(1997, 9, 7), Number(vencimento)),
        'yyyy-MM-dd',
      ).toString()
      : undefined

  return {
    barCode: codeBarValidado,
    amount,
    expirationDate,
  }
}

module.exports = {
  validaTitulo
}