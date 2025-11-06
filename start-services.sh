#!/bin/bash

echo "============================================="
echo "== Iniciando todos os serviços da Epic Saga =="
echo "============================================="
echo ""

# Define o nome do diretório de logs
LOG_DIR=".logs"

# Cria o diretório de logs se não existir (-p) e limpa logs antigos
echo "Criando/Limpando diretório de logs em $LOG_DIR..."
mkdir -p "$LOG_DIR"
rm -f "$LOG_DIR"/*.log
echo ""

# Lista dos serviços
SERVICES=("orchestrator" "orders" "payments" "stock")

# Loop por cada serviço
for SERVICE in "${SERVICES[@]}"
do
  echo "--- Processando $SERVICE ---"
  
  # Entra na pasta do serviço
  cd "$SERVICE"
  
  # Verifica se node_modules existe
  if [ ! -d "node_modules" ]; then
    echo "Pasta 'node_modules' não encontrada. Instalando dependências..."
    npm install
  else
    echo "'node_modules' já existe. Pulando 'npm install'."
  fi
  
  # Define o caminho completo do arquivo de log
  LOG_FILE="../$LOG_DIR/$SERVICE.log"
  
  echo "Iniciando $SERVICE em background... (logs em $LOG_FILE)"
  
  npm start > "$LOG_FILE" 2>&1 &
  
  cd ..
  echo "---------------------------"
  sleep 1 
done

echo ""
echo "✅ Todos os serviços foram iniciados em background."
echo "Os logs estão sendo salvos na pasta $LOG_DIR/"
echo ""
echo "Para ver os logs de todos os serviços EM TEMPO REAL:"
echo "=> tail -f $LOG_DIR/*.log"
echo ""
echo "Para parar TODOS os serviços de uma vez:"
echo "=> killall node"
echo ""