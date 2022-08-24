const fs = require("fs")


class Database {
  PATH_DB = process.cwd() + "/src/database/data.json"

  /** Lê o banco */ 
  read() {
    const data = fs.readFileSync(this.PATH_DB, 'utf-8', () => {})
    return JSON.parse(data)
  }

  /** Escreve no banco */ 
  write(data) {
    const jsonString = JSON.stringify(data, null, "\t")
    fs.writeFileSync(this.PATH_DB, jsonString, () => {})
  }

  /** Lê uma coluna específica do banco */
  readColumn(column) {
    const data = this.read()
    return data[column]
  }

  /** Atualiza o banco */
  update(column, value) {
      const data = this.read()
      data[column].push(value)
      this.write(data)
  }

  /** Retira um valor específico do banco */
  remove(column, value) {
      const data = this.read()
      data[column].splice(data[column].indexOf(value), 1)
      this.write(data)
  }
}

const database = new Database()
module.exports = database
