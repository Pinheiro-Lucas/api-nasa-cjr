// Checagem de banco e config
const fs = require("fs")

if (!fs.existsSync("./config.json") || !fs.existsSync("./src/database/data.json")) {
    console.log("CONFIGURE TUDO ANTES DE USAR A API")
    process.exit()
}

const express = require("express")
const config = require("../config.json")
const routes = require("./routes")

// Configurações da API
const PORT = config.port
const app = express();

// Json e parser urlencoded (integrados na v4)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)


app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
})
