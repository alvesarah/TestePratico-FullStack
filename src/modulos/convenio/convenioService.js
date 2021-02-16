const funcoes = require("../funcoes/calculos")

const validaConvenio = (linhaDigitavel) => {
  const campos = {
    campo1: linhaDigitavel.slice(0, 12),
    campo2: linhaDigitavel.slice(12, 24),
    campo3: linhaDigitavel.slice(24, 36),
    campo4: linhaDigitavel.slice(36, 48)
  }

  const camposSemDV = {
    campo1: campos.campo1.slice(0, 11),
    campo2: campos.campo2.slice(0, 11),
    campo3: campos.campo3.slice(0, 11),
    campo4: campos.campo4.slice(0, 11)
  }

  const valorEfetivoDeReferencia = Number(campos.campo1.slice(2, 3))

  if (![6, 7, 8, 9].includes(valorEfetivoDeReferencia)) {
    throw new Error(
      message = 'Valor Efetivo ou Referência não é válido',
    )
  }

  const modulo = [6, 7].includes(valorEfetivoDeReferencia) ? 10 : 11

  const codeBarNaoValidado =
    camposSemDV.campo1.slice(0, 3) +
    camposSemDV.campo1.slice(4, 12) +
    camposSemDV.campo2 +
    camposSemDV.campo3 +
    camposSemDV.campo4

  const digitosVerificadores = {
    digito1: Number(campos.campo1.slice(11, 12)),
    digito2: Number(campos.campo2.slice(11, 12)),
    digito3: Number(campos.campo3.slice(11, 12)),
    digito4: Number(campos.campo4.slice(11, 12)),
    digitoGeral: Number(campos.campo1.slice(3, 4))
  }

  const digitosValidados = {
    digito1:
      modulo === 10
        ? funcoes.retornaDVModulo10(campos.campo1.slice(0, 11))
        : funcoes.retornaDVModulo11Convenio(campos.campo1.slice(0, 11)),
    digito2:
      modulo === 10
        ? funcoes.retornaDVModulo10(campos.campo2.slice(0, 11))
        : funcoes.retornaDVModulo11Convenio(campos.campo2.slice(0, 11)),
    digito3:
      modulo === 10
        ? funcoes.retornaDVModulo10(campos.campo3.slice(0, 11))
        : funcoes.retornaDVModulo11Convenio(campos.campo3.slice(0, 11)),
    digito4:
      modulo === 10
        ? funcoes.retornaDVModulo10(campos.campo4.slice(0, 11))
        : funcoes.retornaDVModulo11Convenio(campos.campo4.slice(0, 11)),
    digitoGeral:
      modulo === 10
        ? funcoes.retornaDVModulo10(codeBarNaoValidado)
        : funcoes.retornaDVModulo11Convenio(codeBarNaoValidado)
  }

  comparaEValidaDigitosVerificadores(digitosValidados, digitosVerificadores)
  return retornaResponseBody(camposSemDV)
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

  if (digitosValidados.digitoGeral !== digitosVerificadores.digitoGeral) {
    throw new Error(
      `DV Geral está incorreto! O DV esperado é ${digitosValidados.digitoGeral}, DV recebido é ${digitosVerificadores.digitoGeral}`
    )
  }
}

const retornaResponseBody = (camposSemDV) => {
  const barCode =
    camposSemDV.campo1 +
    camposSemDV.campo2 +
    camposSemDV.campo3 +
    camposSemDV.campo4

  const valorBoleto = (
    parseFloat(
      camposSemDV.campo1.slice(4, 12) + camposSemDV.campo2.slice(0, 4),
    ) / 100
  ).toFixed(2)

  const amount = valorBoleto !== '0.00' ? valorBoleto : undefined

  return {
    barCode,
    amount
  }
}

module.exports = {
  validaConvenio
}
