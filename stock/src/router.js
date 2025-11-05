const express = require("express");
const controller = require("./controllers");

const router = express.Router();

router.post("/estoque/reserva", (req, res) => {
  controller.reserve(req, res);
});
router.post("/estoque/liberacao", (req, res) => {
  controller.release(req, res);
});

module.exports = router;
