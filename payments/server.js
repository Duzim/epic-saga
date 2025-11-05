const express = require("express");
const router = require('./src/router');

const app = express();
const PORT = 3002;

app.use(express.json())
app.use(router);

app.listen(PORT, () => {
    console.log('Aplicacao[Servicos de Pagamentos] disponivel em: http://localhost:3002/');
});
