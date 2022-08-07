const database = require("../src/database")
const webhook = require("../src/webhook")

// Função para saber o próximo membro a tocar a reunião
const proximo = () => {
    const data = database.load()
    const column = "membros-nasa"
    const membro = data[column][0]
    
    database.remove(column, membro)
    database.update(column, membro)

    return membro
}

function commands(req, res) {
    const params = req.body.text.split(' ')
    const comando = params[0]
    
    try {
        // Adiciona um membro na nasa
        if (comando == "adicionar") {
            const nome = params.slice(1).join(' ')
            database.update("membros-nasa", nome)
            webhook.send(`Membro ${nome} adicionado`)
        // Puxa o próximo membro da fila
        } else if (comando == "proximo") {
            const nome = proximo()
            webhook.send(`Próximo membro: ${nome}`)
        // Retorna a fila de membros sem alterá-la
        } else if (comando == "fila") {
            const data = database.load()
            const membros = data["membros-nasa"].join("\n")
            webhook.send(`Fila: \n${membros}`)
        }
    }

    catch(err) {
        webhook.send(`Deu errado! (${err})`)
    }

    res.status(200).send()
}

module.exports = { commands }