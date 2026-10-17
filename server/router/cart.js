import express from "express";
import { createCart, deleteCart, getCart, getCartById, updateCart } from "../controller/cart.js";
import { auth } from "../middleware/auth.js";

export const cartRouter = express.Router()

cartRouter.get("/" , auth , getCart)
cartRouter.get("/:id" , auth , getCartById)
cartRouter.post("/" , auth , createCart)
cartRouter.put("/:id" , auth , updateCart)
cartRouter.delete("/:id" , auth , deleteCart)