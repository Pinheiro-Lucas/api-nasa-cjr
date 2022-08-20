const fs = require("fs")

const PATH_DB = "./data.json"
const database = require(PATH_DB)

// Função para carregar o banco
const load = () => {
    return database
}

// Função para atualizar o banco
const update = (column, value) => {
    const data = load()
    data[column].push(value)
    // Parâmetros: \t (identação com tab)
    const jsonString = JSON.stringify(data, null, "\t")
    fs.writeFileSync(PATH_DB, jsonString, () => {})
}

// Função para retirar um valor específico do banco
const remove = (column, value) => {
    const data = load()
    data[column].splice(data[column].indexOf(value), 1)
    const jsonString = JSON.stringify(data)
    fs.writeFileSync(PATH_DB, jsonString, () => {})
}

const read = (column) => {
  const data = load()
  return data[column]
}


module.exports = {
    load,
    read,
    update,
    remove
}