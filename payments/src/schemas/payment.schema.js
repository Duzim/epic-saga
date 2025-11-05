const { z } = require("zod");

const processPaymentSchema = z.object({
  pedidoId: z.string().min(1, "Deve conter ID do pedido"),
  produtoId: z.string().min(1, "Deve conter ID do produto"),
  valor: z.number().positive("O 'valor' deve ser maior que zero"),
});

const paramsSchema = z.object({
  id: z.string().min(1, "Deve conter ID do pagamento nos parametros"),
});

module.exports = {
    processPaymentSchema,
    paramsSchema,
}
