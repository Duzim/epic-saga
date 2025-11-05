const express = require('express')
const router = require('./src/router')
const app = express()

const PORT = 3001;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log('Aplicacao[Servicos de pedidos] disponivel em: http://localhost:3001/');
});
