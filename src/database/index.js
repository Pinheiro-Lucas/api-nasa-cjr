const fs = require("fs")

const PATH_DB = process.cwd() + "/src/database/data.json"

/** Lê o banco */ 
const read = () => {
  const data = fs.readFileSync(PATH_DB, 'utf-8', () => {})
  return JSON.parse(data)
}

/** Escreve no banco */ 
const write = (data) => {
  const jsonString = JSON.stringify(data, null, "\t")
  fs.writeFileSync(PATH_DB, jsonString, () => {})
}

/** Lê uma coluna específica do banco */
const readColumn = (column) => {
  const data = read()
  return data[column]
}

/** Atualiza o banco */
const update = (column, value) => {
    const data = read()
    data[column].push(value)
    write(data)
}

/** Retira um valor específico do banco */
const remove = (column, value) => {
    const data = read()
    data[column].splice(data[column].indexOf(value), 1)
    write(data)
}

module.exports = {
    load: read,
    read: readColumn,
    update,
    remove
}
