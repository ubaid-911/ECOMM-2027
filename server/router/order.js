import express from "express";
import { createOrder, deleteOrder, getOrder, getOrderById } from "../controller/order.js";
import { auth } from "../middleware/auth.js";

export const orderRouter = express.Router()

orderRouter.get("/" , auth , getOrder)
orderRouter.get("/:id" , auth , getOrderById)
orderRouter.post("/" , auth , createOrder)
orderRouter.delete("/:id" , auth , deleteOrder) 