const { v4 } = require("uuid");

const payments = [];

function generateRandomInterval() {
  const delay = Math.floor(Math.random() * 1500) + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function processPayment(paymentDto) {
  if (paymentDto.produtoId === "123456") {
    throw new Error("Pagamento Recusado.")
  }
  const newPayment = {
    id: v4(),
    status: "APROVADO",
    ...paymentDto,
  };
  payments.push(newPayment);
  await generateRandomInterval();
  console.log(`[Payment Service] pagamento efetuado: ${newPayment.id}`);
  return newPayment;
}

async function reimbursementPayment(id) {
  const paymentIndex = payments.findIndex((payment) => payment.id === id);
  if (paymentIndex === -1) {
    throw new Error("Pagamento nao encontrado");
  }

  payments[paymentIndex].status = "REEMBOLSADO";
  await generateRandomInterval();

  console.log(
    `[REEMBOLSO DE PAGAMENTO] Pagamento ${payments[paymentIndex].id} reembolsado.`
  );
  return payments[paymentIndex];
}

module.exports = {
  processPayment,
  reimbursementPayment,
};
