import express from "express";

const app = express();
app.use(express.json());

import router from "./routes.js";
app.use(router);

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
