const database = require("../database")
const webhook = require("../helpers/webhook")


class Nasa {
  // Adiciona um membro na nasa
  async adicionar(params) {
    const membro = params.join(' ')
    database.update("membros-nasa", `${membro}`)

    await webhook.send(`Membro <${membro}> adicionado`)
  }

  // Puxa o próximo membro da fila
  async proximo(params) {
    const column = "membros-nasa"
    const membros = database.read(column)
    const membro = membros[0]

    database.remove(column, membro)
    database.update(column, membro)

    await webhook.send(`Próximo membro: <${membro}>`)
  }

  // Retorna a fila de membros sem alterá-la
  async fila(params) {
    const membros = database.read("membros-nasa")

    await webhook.send(`Fila:\n${membros.join("\n")}`)
  }
}
const nasa = new Nasa()

// função que lida com a requisição vinda do slack
async function commands(req, res) {
  const [comando, ...params] = req.body.text.split(' ')

  try {
      if (nasa[comando] === undefined) 
        throw new Error(`Comando "${comando}" não encontrado.`)

      await nasa[comando](params)
  } catch(err) {
      await webhook.send(`Deu errado! (${err})`)
  }

  res.status(200).send()
}


module.exports = commands
