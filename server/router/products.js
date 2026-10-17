import express from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controller/products.js"

export const productsRouter = express.Router()

productsRouter.get("/" , getProduct)
productsRouter.get("/:id" , getProductById)
productsRouter.post("/" , createProduct)
productsRouter.put("/:id" , updateProduct)
productsRouter.delete("/:id" , deleteProduct)