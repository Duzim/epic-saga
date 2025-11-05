const service = require("../services/service");
const { ZodError } = require("zod");
const { initSagaSchema } = require("../schemas/init-saga.schema");

module.exports = {
  init,
};

async function init(req, res) {
  try {
    const body = req.body;
    const initSagaDto = initSagaSchema.parse(body);
    const result = await service.init(initSagaDto);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: error.issues,
      });
    } else {
      console.error(error);
      res.status(500).json({ message: "Erro interno ao iniciar saga" });
    }
  }
}
