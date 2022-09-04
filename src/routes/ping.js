const webhook = require("../helpers/webhook")

async function ping (req, res) {
  const userId = req.body.user_id
  await webhook.send(`Pong <@${userId}>`)
  res.status(200).send(`Pong <@${userId}>`)
}

module.exports = ping