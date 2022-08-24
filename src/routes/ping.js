const webhook = require("../helpers/webhook")

async function ping (req, res) {
    await webhook.send("Pong")
    res.status(200).send("Pong")
}

module.exports = ping