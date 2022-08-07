const webhook = require("../src/webhook.js")

function ping (req, res) {
    webhook.send("Pong")
    res.status(200).send()
}

module.exports = { ping }