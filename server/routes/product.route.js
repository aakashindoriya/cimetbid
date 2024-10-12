const express = require("express")
const { createProduct,deleteProduct,getProductById,getProducts,updateProduct } = require("../controllers/product.controller")

const app = express.Router()

app.post("/create", createProduct)
app.get("/", getProducts)
app.get("/:id",getProductById)
app.put("/:id", updateProduct)
app.delete("/:id", deleteProduct)

module.exports = app