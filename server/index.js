import express from "express"
import cors from "cors"
import { usersRouter } from "./router/users.js";
import { productsRouter } from "./router/products.js";
import { orderRouter } from "./router/order.js";
import { cartRouter } from "./router/cart.js";

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use('/api/v1/users',usersRouter)
app.use('/api/v1/products',productsRouter)
app.use('/api/v1/order' , orderRouter)
app.use('/api/v1/cart' , cartRouter)



app.listen(PORT , ()=> {
    console.log("Server is Connected")
})

