import express from "express";
import { createCart, deleteCart, getCart, getCartById, updateCart } from "../controller/cart.js";

export const cartRouter = express.Router()

cartRouter.get("/" , getCart)
cartRouter.get("/:id" , getCartById)
cartRouter.post("/" , createCart)
cartRouter.put("/:id" , updateCart)
cartRouter.delete("/:id" , deleteCart)