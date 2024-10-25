const express = require("express")
const { LOGIN, SIGNUP ,LOGOUT} = require("../controllers/user.controller")

const app = express.Router()

app.post("/login", LOGIN)
app.post("/signup", SIGNUP)
app.get("/logout", LOGOUT)
module.exports = app