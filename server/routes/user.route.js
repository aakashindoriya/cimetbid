const express = require("express")
const { LOGIN, SIGNUP } = require("../controllers/user.controller")

const app = express.Router()

app.post("/login", LOGIN)
app.post("/signup", SIGNUP)

module.exports = app