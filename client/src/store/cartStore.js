import {create} from "zustand"
import axios from "axios"

const API_URL = "http://localhost:5000/api/v1/cart";

export const useCartStore = (set)=>({

    cart:[],
    getCart:async()=>{
        try {

        const {data} = await axios.get(API_URL)

        set({cart:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    getCartById:async(id)=>{
        try {

        const {data} = await axios.get(`${API_URL}/${id}`)
        set({cart:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    createCart:async(data)=>{
        try {

        const response = await axios.post(API_URL,data)

        set((state)=>({
            cart:[...state.cart,response.data[0]]
        }))
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteCart:async(id)=> {
        try {

        await axios.delete(`${API_URL}/${id}`)

        set((state)=>({
            cart:state.cart.filter((item)=> item?.id != id)
        }))
            
        } catch (error) {
            console.log(error)
        }
    },

    saveCart:async(data,id)=> {
        try {

        const response = await axios.put(data,`${API_URL}/${id}`)

        set((state)=>({
            cart:state.cart.map((item)=> item?.id == id ? response.data[0] : item)
        }))
            
        } catch (error) {
            console.log(error)
        }
    }

})