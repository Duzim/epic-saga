const axios = require("axios");

const SERVICES = {
  orders: "http://localhost:3001",
  payments: "http://localhost:3002",
  stock: "http://localhost:3003",
};

// Order
const orderApi = axios.create({
  baseURL: SERVICES.orders,
});
function createOrder(orderDto) {
  return orderApi.post("/pedidos", orderDto);
}
function updateOrderStatus(id, statusDto) {
  return orderApi.put(`/pedidos/${id}/status`, statusDto);
}

//Payment
const paymentApi = axios.create({
  baseURL: SERVICES.payments,
});
function processPayment(paymentDto) {
  return paymentApi.post("/pagamentos", paymentDto);
}
function processPaymentReimbursement(id) {
  return paymentApi.post(`/pagamentos/${id}/reembolso`);
}

//Stock
const stockApi = axios.create({
  baseURL: SERVICES.stock,
});
function reserveFromStock(reserveDto) {
  return stockApi.post("/estoque/reserva", reserveDto);
}
function stockRelease(releaseDto) {
  return stockApi.post("/estoque/liberacao", releaseDto);
}

module.exports = {
  order: {
    create: createOrder,
    updateStatus: updateOrderStatus,
  },
  payment: {
    pay: processPayment,
    reimbursement: processPaymentReimbursement,
  },
  stock: {
    reserve: reserveFromStock,
    release: stockRelease,
  },
};
