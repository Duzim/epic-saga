const { createOrder, updateOrderStatus } = require("./service");
const { ZodError } = require("zod");
const {
  createOrderSchema,
  updateStatusSchema,
  paramsSchema,
} = require("./schemas/order.schema");

async function create(req, res) {
  try {
    const body = req.body;
    const createOrderDto = createOrderSchema.parse(body);
    const order = await createOrder(createOrderDto);
    res.status(201).json({
      pedidoId: order.id,
      status: order.status,
      data: order,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: error.issues,
      });
    } else {
      console.error(error);
      res.status(500).json({ message: "Erro interno ao criar pedido" });
    }
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = paramsSchema.parse(req.params);
    const body = req.body;
    const updateStatusDto = updateStatusSchema.parse(body);

    const updatedOrder = await updateOrderStatus(id, updateStatusDto);
    res.status(201).json({
      pedidoId: updatedOrder.id,
      status: updatedOrder.status,
      data: updatedOrder,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: error.issues,
      });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ message: error.message || "Erro interno ao atualizar pedido" });
    }
  }
}

module.exports = {
  create,
  updateStatus,
};
