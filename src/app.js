// Checagem de banco e config
require('dotenv').config() // .env
const fs = require("fs")

if (!fs.existsSync("./.env") || !fs.existsSync("./src/database/data.json")) {
    console.log("CONFIGURE TUDO ANTES DE USAR A API")
    process.exit()
}

// imports
const express = require("express")
const routes = require("./routes")

// Configurações da API
const PORT = process.env.PORT
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  const datetime = new Date().toLocaleString('pt-BR', { hour12: false })
  console.log(`${datetime}: server rodando na porta ${PORT}`);
})
