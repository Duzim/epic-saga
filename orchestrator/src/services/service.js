const api = require("../api/client");

// sagaData
// {
//   "clienteId": "cliente-123",
//   "produtoId": "produto-abc",
//   "quantidade": 1,
//   "valor": 150.00
// }

async function init(sagaData) {
  console.log("🤖 [Service] Iniciando saga...", sagaData);
  let orderResult = null;
  let updateOrderResult = null;
  let paymentResult = null;
  let stockResult = null;

  try {
    const orderDto = { ...sagaData };
    console.log("🤖 [Service] -> 1. Criando Pedido...");
    const orderResponse = await api.order.create(orderDto);
    orderResult = orderResponse.data;
    console.log(`🤖 [Service] <- 1. Pedido Criado: ${orderResult.orderId}`);

    const paymentDto = {
      pedidoId: orderResult.pedidoId,
      produtoId: sagaData.produtoId,
      valor: sagaData.valor,
    };
    console.log("🤖 [Service] -> 2. Processando Pagamento...");
    const paymentResponse = await api.payment.pay(paymentDto);
    paymentResult = paymentResponse.data;
    console.log("🤖 [Service] <- 2. Pagamento Aprovado: ", paymentResult);

    console.log("🤖 [Service] -> 3. Reservando Estoque...");
    const stockReserveDto = {
      pedidoId: orderResult.pedidoId,
      produtoId: sagaData.produtoId,
      quantidade: sagaData.quantidade,
    };
    const stockResponse = await api.stock.reserve(stockReserveDto);
    stockResult = stockResponse.data;
    console.log(`🤖 [Service] <- 3. Estoque Reservado.`);

    const updateOrderStatusDto = {
      status: "CONFIRMADO",
    };
    console.log(`🤖 [Service] -> 4. Atualizando estado do pedido.`);
    const updateOrderStatusResponse = await api.order.updateStatus(
      orderResult.pedidoId,
      updateOrderStatusDto
    );
    updateOrderResult = updateOrderStatusResponse.data;
    console.log(
      "🤖 [Service] <- 4. Estado do pedido foi atualizado.",
      updateOrderResult
    );

    return {
      success: true,
      message: "Saga concluída com sucesso!",
      status: "PEDIDO_CONFIRMADO",
      data: { orderResult, paymentResult, stockResult, updateOrderResult },
    };
    
  } catch (error) {
    const originalError = error.response
      ? error.response.data
      : { message: error.message };
    console.error(`❌ [Service] FALHA NA SAGA! Etapa falhou.`, originalError);
    console.log("🤖 [Service] -> Iniciando Rollback...");

    try {
      if (stockResult) {
        console.log(`🤖 [Service] <- Rollback 3: Liberando Estoque...`);
        await api.stock.release({ pedidoId: orderResult.pedidoId });
      }

      if (paymentResult) {
        console.log(`🤖 [Service] <- Rollback 2: Reembolsando Pagamento...`);
        await api.payment.reimbursement(paymentResult.pagametoId);
      }

      // Rollback 1: Se o pedido foi criado, cancela
      if (orderResult) {
        console.log(`🤖 [Service] <- Rollback 1: Cancelando Pedido...`);
        await api.order.updateStatus(orderResult.pedidoId, {
          status: "CANCELADO",
        });
      }

      console.log("🤖 [Service] Rollback concluído.");
      // **IMPORTANTE**: Retorna o objeto de falha para o controller
      return {
        success: false,
        message: "Falha na Saga, rollback executado.",
        error: originalError,
      };
    } catch (rollbackError) {
      console.error(
        "❌ [Service] FALHA CATASTRÓFICA! Rollback falhou!",
        rollbackError.message
      );
      // **IMPORTANTE**: Retorna a falha catastrófica
      return {
        success: false,
        message:
          "Falha na Saga E Falha no Rollback. Intervenção manual necessária.",
        error: rollbackError.message,
      };
    }
  }
}

module.exports = {
  init,
};
