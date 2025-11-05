const express = require('express');
const logs = require('./middlewares/logs')
const router = express.Router();
const controller = require('../controllers/orchestrator')

router.post('/processar-pedido', logs, (req, res) => {
    controller.init(req, res);
});

module.exports = router