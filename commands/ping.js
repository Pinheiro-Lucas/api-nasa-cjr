const webhook = require("../src/webhook.js")

async function ping (req, res) {
    await webhook.send("Pong")
    res.status(200).send("Pong")
}

module.exports = { ping }