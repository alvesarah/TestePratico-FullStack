const validacao = require('./validacaoInputService')
const convenio = require('../modulos/convenio/convenioService')
const titulo = require('../modulos/titulo/tituloService')

const validaLinhaDigitavel = (request, response) => {
  try {
    const linhaDigitavel = request.params.codigo

    validacao.validacaoInput(linhaDigitavel)
    
    let body
    body = validacao.identificaTipo(linhaDigitavel) === 'TITULO' 
      ? titulo.validaTitulo(linhaDigitavel) 
      : convenio.validaConvenio(linhaDigitavel)

    return response.status(200).json(body)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
}

module.exports = {
  validaLinhaDigitavel
}
