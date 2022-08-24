const axios = require("axios")

const WEBHOOK_URL = process.env.WEBHOOK

// Função para facilitar o envio de webhook
const send = async mensagem => {
    await axios.post(WEBHOOK_URL, {
        text: mensagem
    })
}

module.exports = { send }
