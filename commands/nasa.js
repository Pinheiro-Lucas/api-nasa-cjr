const database = require("../src/database")
const webhook = require("../src/webhook")


class Nasa {
  // Adiciona um membro na nasa
  async adicionar(params) {
    const nome = params.join(' ')
    database.update("membros-nasa", `<${nome}>`)

    await webhook.send(`Membro <${nome}> adicionado`)
  }

  // Puxa o próximo membro da fila
  async proximo(params) {
    const data = database.load()
    const column = "membros-nasa"
    const membro = data[column][0]
    
    database.remove(column, membro)
    database.update(column, membro)

    await webhook.send(`Próximo membro: ${membro}`)
  }

  // Retorna a fila de membros sem alterá-la
  async fila(params) {
    const data = database.load()
    const membros = data["membros-nasa"]
      .map(membro => membro.slice(1,-1)) // tira os <>
      .join("\n")

    await webhook.send(`Fila:\n${membros}`)
  }
}

async function commands(req, res) {
    const nasa = new Nasa()
    const [comando, ...params] = req.body.text.split(' ')

    try {
        if (nasa[comando] === undefined) 
          throw new Error(`Comando "${comando}" não encontrado.`)

        nasa[comando](params)
    } catch(err) {
        await webhook.send(`Deu errado! (${err})`)
    }

    res.status(200).send()
}

module.exports = commands