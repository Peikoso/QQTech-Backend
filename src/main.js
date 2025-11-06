require('dotenv').config();

const express = require('express');
const cors = require('cors');
const process = require('process')

const app = express();
app.use(cors());
app.use(express.json());

PORT = process.env.PORT || 8000;

app.get('/', async(req, res) => {
    res.json('Bem Vindo ao QQMonitor');
});

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
  // Em produção pode ser desejável reiniciar o processo
}); // sem esses handlers, a aplicação pode morrer sem logs claros, com eles você pelo menos registra o erro.

// Start
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});