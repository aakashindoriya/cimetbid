const express = require("express")
const { createProduct,deleteProduct,getProductById,getProducts,updateProduct ,confirmBid} = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const checkAdmin = require("../middlewares/admin.middleware")

const app = express.Router()
app.put("/bid-confirm",authMiddleware,checkAdmin,confirmBid)
app.post("/create",authMiddleware,checkAdmin, createProduct)
app.get("/", getProducts)
app.get("/:id",getProductById)
app.put("/:id",authMiddleware,checkAdmin, updateProduct)
app.delete("/:id",authMiddleware,checkAdmin, deleteProduct)

module.exports = app