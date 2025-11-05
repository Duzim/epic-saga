const { processPayment, reimbursementPayment } = require("./service");
const {
  paramsSchema,
  processPaymentSchema,
} = require("./schemas/payment.schema");
const { ZodError } = require("zod");

async function process(req, res) {
  try {
    const body = req.body;
    const paymentDto = processPaymentSchema.parse(body);
    const paymentProcessed = await processPayment(paymentDto);

    res.status(201).json({
      pagamentoId: paymentProcessed.id,
      status: paymentProcessed.status,
      data: paymentProcessed,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: error.issues,
      });
    } else {
      console.error(error);
      res.status(400).json({ message: "Erro interno ao processar pagamento" });
    }
  }
}

async function reimbursement(req, res) {
  try {
    const { id } = paramsSchema.parse(req.params);
    const reimbursemented = await reimbursementPayment(id);
    res.status(200).json({
      pagamentoId: reimbursemented.id,
      status: reimbursemented.status,
      data: reimbursemented,
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
        .json({
          message: error.message || "Erro interno ao reembolsar pagamento",
        });
    }
  }
}

module.exports = {
  process,
  reimbursement,
};
