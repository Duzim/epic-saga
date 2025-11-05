const { v4 } = require("uuid");
const orders = [];

function generateRandomInterval() {
  const delay = Math.floor(Math.random() * 1500) + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function createOrder(createOrderDto) {
  const newOrder = {
    id: v4(),
    status: "PENDENTE",
    ...createOrderDto,
  };
  await generateRandomInterval();
  orders.push(newOrder);
  console.log(`[Orders Service] Pedido criado: ${newOrder.id}`);
  return newOrder;
}

async function updateOrderStatus(id, updateStatusDto) {
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    throw new Error("Pedido nao encontrado");
  }

  const { status } = updateStatusDto;
  orders[orderIndex].status = status;
  await generateRandomInterval();

  console.log(`[Orders Service] Pedido ${id} atualizado para status: ${status}`);

  return orders[orderIndex];
}

module.exports = {
  createOrder,
  updateOrderStatus,
};
