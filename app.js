// Checagem de banco e config
const fs = require("fs")

if (!fs.existsSync("./config.json") || !fs.existsSync("./database/data.json")) {
    console.log("CONFIGURE TUDO ANTES DE USAR A API")
    process.exit()
}

const express = require("express")
const config = require("./config.json")
// Não precisa mais usar o bodyParser
//const bodyParser = require("body-parser")

const ping = require("./commands/ping")
const nasa = require("./commands/nasa")

// Configurações da API
const PORT = config.port
const app = express();

// Json e parser urlencoded (integrados na v4)
app.use(express.urlencoded())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
})


// Comandos
app.post("/teste", nasa) // usa server diferente
app.post("/nasa", nasa)
app.get("/", ping.ping)