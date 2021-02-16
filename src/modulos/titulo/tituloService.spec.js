const { validaTitulo } = require("./tituloService")

describe("Validação e Retorno de dados do Título", () => {
  it('Deve retornar os campos necessários', () => {
    const linhaDigitavelTitulo = "21290001192110001210904475617405975870000002000"
    const result = validaTitulo(linhaDigitavelTitulo)
    expect(result).toHaveProperty("barCode")
    expect(result).toHaveProperty("amount")
    expect(result).toHaveProperty("expirationDate")
  })
  it('Deve validar DV da linha digitavél', () => {
    expect(() => validaTitulo('21290001102110001210904475617405975870000002000')).toThrow(Error)
    expect(() => validaTitulo('21290001192110001210104475617405975870000002000')).toThrow(Error)
    expect(() => validaTitulo('21290001192110001210904475617402975870000002000')).toThrow(Error)
    expect(() => validaTitulo('21290001192110001210904475617405275870000002000')).toThrow(Error)
  })
})