const dayjs = require("dayjs")
const weekOfYear = require("dayjs/plugin/weekOfYear")
dayjs.extend(weekOfYear)

const database = require("../database")
const webhook = require("../helpers/webhook")


class Nasa {
  constructor(params) {
    this._params = params
  }

  // Adiciona um membro na nasa
  async adicionar() {
    const membro = this._params.join(' ')
    database.update("membros-nasa", membro)

    await webhook.send(`Membro <${membro}> adicionado`)
  }

  // Puxa o próximo membro da fila
  async proximos() {
    const column = "membros-nasa"
    const membros = database.readColumn(column).sort()

    const weekNum = dayjs().week()
    const regerencia = membros[(weekNum + 0) % membros.length]
    const refofoca = membros[(weekNum + 1) % membros.length]
    const transparencia = membros[(weekNum + 2) % membros.length]

    await webhook.send(`
      Responsabilidades da semana:
      \tRegerência: <${regerencia}>
      \tRefofoca: <${refofoca}>
      \tTransparência: <${transparencia}>
    `)
  }

  // Retorna a fila de membros sem alterá-la
  async fila() {
    const membros = database.readColumn("membros-nasa").sort()

    await webhook.send(
      membros.length > 0 
        ? `Fila:\n${membros.join("\n")}`
        : `Fila vazia ;-;`
    )
  }
}

// função que lida com a requisição vinda do slack
async function commands(req, res) {
  const [comando, ...params] = req.body.text.split(' ')
  const nasa = new Nasa(params)

  try {
      if (nasa[comando] === undefined) 
        throw new Error(`Comando "${comando}" não encontrado.`)

      await nasa[comando]()
  } catch(err) {
      await webhook.send(`Deu errado! (${err})`)
  }

  res.status(200).send()
}


module.exports = commands
