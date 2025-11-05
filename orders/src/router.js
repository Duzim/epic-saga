const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.post('/pedidos', (req, res) => {
    controller.create(req, res);
});

router.put('/pedidos/:id/status', (req, res) => {
    controller.updateStatus(req, res)
});

module.exports = router