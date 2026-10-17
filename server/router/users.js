import express from "express";
import { deleteUser, getUser, getUserById, updateUser } from "../controller/users.js";

export const usersRouter = express.Router()

usersRouter.get("/" , getUser)
usersRouter.get("/:id" , getUserById)
usersRouter.put("/:id" , updateUser)
usersRouter.delete("/:id" , deleteUser)