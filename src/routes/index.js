const { Router } = require("express")

const ping = require("./ping")
const nasa = require("./nasa")

const router = Router()

// Comandos
router.post("/teste", nasa) // usa server diferente
router.post("/nasa", nasa)
router.get("/", ping)

module.exports = router
