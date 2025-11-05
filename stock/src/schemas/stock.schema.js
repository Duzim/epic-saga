const { z } = require("zod");

const stockSchema = z.object({
  pedidoId: z.string().min(1, "Deve conter ID do pedido"),
  produtoId: z.string().min(1, "Deve conter ID do produto"),
  quantidade: z
    .number()
    .int("A 'quantidade' deve ser um número inteiro")
    .positive("A 'quantidade' deve ser maior que zero"),
});

module.exports = { stockSchema };
