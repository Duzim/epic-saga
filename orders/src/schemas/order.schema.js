const { z } = require("zod");

const createOrderSchema = z.object({
  clienteId: z.string().min(1, "O campo 'clienteId' é obrigatório"),
  produtoId: z.string().min(1, "O campo 'produtoId' é obrigatório"),
  quantidade: z
    .number()
    .int("A 'quantidade' deve ser um número inteiro")
    .positive("A 'quantidade' deve ser maior que zero"),
  valor: z.number().positive("O 'valor' deve ser maior que zero"),
});

const updateStatusSchema = z.object({
  status: z.enum(["CONCLUIDO", "CANCELADO"], {
    errorMap: () => ({
      message: "O status deve ser 'CONCLUIDO' ou 'CANCELADO'",
    }),
  }),
});

const paramsSchema = z.object({
  id: z.string().min(1, "Deve conter ID do pedido nos parametros"),
});

module.exports = {
  createOrderSchema,
  updateStatusSchema,
  paramsSchema,
};
