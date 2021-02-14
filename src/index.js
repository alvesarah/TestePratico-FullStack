var express = require("express");
var app = express();

app.get("/boleto/:linhadigitavel", function(req, res){
    res.send(req.params)
});

app.listen(8080, function(){
    console.log("Servidor rodando na url http://localhost:8080");
});