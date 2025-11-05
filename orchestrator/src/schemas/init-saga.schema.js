const { z } = require("zod");

const initSagaSchema = z.object({
  clienteId: z.string().min(1, "O campo 'clienteId' é obrigatório"),
  produtoId: z.string().min(1, "O campo 'produtoId' é obrigatório"),
  quantidade: z
    .number()
    .int("A 'quantidade' deve ser um número inteiro")
    .positive("A 'quantidade' deve ser maior que zero"),
  valor: z.number().positive("O 'valor' deve ser maior que zero"),
});

module.exports = {
  initSagaSchema,
};
