const stock = [
  {
    produtoId: "5f7068f4874d4089",
    nome: "Produto 1",
    estoque: 100,
  },
  {
    produtoId: "5da2d5c759188ec5",
    nome: "Produto 2",
    estoque: 100,
  },
  {
    produtoId: "de1499635b9ad362",
    nome: "Produto 3",
    estoque: 100,
  },
  {
    produtoId: "04414132c2c404a4",
    nome: "Produto 4",
    estoque: 100,
  },
];

function generateRandomInterval() {
  const delay = Math.floor(Math.random() * 1500) + 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function reserveFromStock(stockDto) {
  const index = stock.findIndex((p) => p.produtoId === stockDto.produtoId);

  if (index === -1) {
    console.error(
      `[Falha na Reserva] Produto ${stockDto.produtoId} NÃO ENCONTRADO.`
    );
    throw new Error("Produto não encontrado no estoque.");
  }

  if (stock[index].estoque < stockDto.quantidade) {
    console.error(
      `[Falha na Reserva] Estoque insuficiente para ${stock[index].produtoId}. Pedido: ${stockDto.quantidade}, Estoque: ${stock[index].estoque}`
    );
    throw new Error("Estoque insuficiente.");
  }

  stock[index].estoque = stock[index].estoque - stockDto.quantidade;
  await generateRandomInterval();
  console.log(
    `[Reservar do estoque] Produto ${stock[index].produtoId} reservados Qnt: ${stockDto.quantidade}, restantes: ${stock[index].estoque}`
  );
  return stock[index];
}

async function releaseFromStock(stockDto) {
  const index = stock.findIndex((p) => p.produtoId === stockDto.produtoId);

  if (index === -1) {
    console.error(
      `[Falha na Liberação] Produto ${stockDto.produtoId} NÃO ENCONTRADO. (Rollback falhou)`
    );
    throw new Error("Produto não encontrado para liberar o estoque.");
  }

  stock[index].estoque = stock[index].estoque + stockDto.quantidade;
  await generateRandomInterval();
  console.log(
    `[Liberar do estoque] Produto ${stock[index].produtoId} liberados Qnt: ${stockDto.quantidade}, restantes: ${stock[index].estoque}`
  );
  return stock[index];
}

module.exports = {
  reserveFromStock,
  releaseFromStock,
};
