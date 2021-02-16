const { identificaTipo, validacaoInput } = require("./validacaoInputService")

describe("Validação de input de linha digitável", () => {
  it('Deve validar caracteres da linha digitavél', () => {
    expect(() => validacaoInput('aaaaaaaaaaaaaa')).toThrow(Error)
  })
  it('Deve validar tamanho da linha digitavél', () => {
    expect(() => validacaoInput('8360000000154602011031388344036040201002402308609')).toThrow(Error)
    expect(() => validacaoInput('2129000119211000121090447561740597587000000200')).toThrow(Error)
  })
  it('Deve retornar o tipo de linha digitavél', () => {
    const linhaDigitavelConvenio = "836000000015460201103138834403604020100240230860"
    const linhaDigitavelTitulo = "21290001192110001210904475617405975870000002000"
    expect(identificaTipo(linhaDigitavelConvenio)).toBe('CONVENIO')
    expect(identificaTipo(linhaDigitavelTitulo)).toBe('TITULO')
    })
})