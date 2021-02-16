const express = require("express")
const { validaLinhaDigitavel } = require("./validators/validaLinhaDigitavelService")

const app = express()

app.get('/boleto/:codigo', validaLinhaDigitavel)

app.listen(8080, () => console.log("Servidor rodando na url http://localhost:8080"))