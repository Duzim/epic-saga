const express = require('express');
const controller = require('./controllers');

const router = express.Router();

router.post('/pagamentos', (req, res) => { 
    controller.process(req, res);
});
router.post('/pagamentos/:id/reembolso', (req, res) => {
    controller.reimbursement(req, res);
});

module.exports = router