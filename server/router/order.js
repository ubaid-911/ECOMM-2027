import express from "express";
import { createOrder, deleteOrder, getOrder, getOrderById } from "../controller/order.js";

export const orderRouter = express.Router()

orderRouter.get("/" , getOrder)
orderRouter.get("/:id" , getOrderById)
orderRouter.post("/" , createOrder)
orderRouter.delete("/:id" , deleteOrder)