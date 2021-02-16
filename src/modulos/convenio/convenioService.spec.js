const { validaConvenio } = require("../convenio/convenioService")

describe("Validação e Retorno de dados do Convênio", () => {
  it('Deve retornar os campos esperados', () => {
    const linhaDigitavelConvenio = "836900000024460201103138834403604020100240230860"
    const result = validaConvenio(linhaDigitavelConvenio)
    expect(result).toHaveProperty("barCode")
    expect(result).toHaveProperty("amount")
  })
  it('Deve validar DV da linha digitavél', () => {
    expect(() => validaConvenio('836000000025460201103138834403604020100240230860')).toThrow(Error)
    expect(() => validaConvenio('836900000024460201103137834403604020100240230860')).toThrow(Error)
    expect(() => validaConvenio('836900000024460201103138834403604021100240230860')).toThrow(Error)
    expect(() => validaConvenio('836900000024460201103138834403604020000240230860')).toThrow(Error)
  })
})