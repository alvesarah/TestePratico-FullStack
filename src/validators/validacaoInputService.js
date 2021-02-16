const validacaoInput = (linhaDigitavel) => {
  if (linhaDigitavel.match(/^[0-9]+$/) === null) throw new Error(message = 'Apenas números são aceitos')
  if (linhaDigitavel.length < 47) throw new Error(message = 'Digitos a menos do que o esperado')
  if (linhaDigitavel.length > 48) throw new Error(message = 'Digitos a mais do que o esperado')
}

const identificaTipo = linhaDigitavel => linhaDigitavel.length === 47 ? 'TITULO' : 'CONVENIO'

module.exports = {
  validacaoInput,
  identificaTipo
}