const service = require("./services");
const { ZodError } = require("zod");
const { stockSchema } = require("./schemas/stock.schema");

async function reserve(req, res) {
  try {
    const body = req.body;
    const stockReserveDto = stockSchema.parse(body);
    const stockResponse = await service.reserveFromStock(stockReserveDto);

    res.status(201).json({
      produtoId: stockResponse.produtoId,
      estoque_restante: stockResponse.estoque,
      data: stockResponse,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: error.issues,
      });
    } else if (
      error.message === "Estoque insuficiente" ||
      error.message === "Produto não encontrado no estoque."
    ) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      console.error(error);
      res.status(500).json({
        message: "Erro interno ao reservar produto",
      });
    }
  }
}

async function release(req, res) {
  try {
    const body = req.body;
    const stockReleaseDto = stockSchema.parse(body);
    const stockResponse = await service.releaseFromStock(stockReleaseDto);

    res.status(201).json({
      produtoId: stockResponse.produtoId,
      estoque_restante: stockResponse.estoque,
      data: stockResponse,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: error.issues,
      });
    } else if (
      error.message === "Produto não encontrado para liberar o estoque."
    ) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      console.error(error);
      res.status(500).json({
        message: "Erro interno ao liberar produto",
      });
    }
  }
}

module.exports = {
  reserve,
  release,
};
