const axios = require("axios")
const config = require("../../config.json")

const WEBHOOK_URL = config.webhook

// Função para facilitar o envio de webhook
const send = async mensagem => {
    await axios.post(WEBHOOK_URL, {
        text: mensagem
    })
}

module.exports = { send }
