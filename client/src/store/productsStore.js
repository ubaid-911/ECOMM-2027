import {create} from "zustand"
import axios from "axios"

const API_URL = "http://localhost:5000/api/v1/products";

export const useProductsStore = (set)=>({

    products:[],
    getProducts:async()=>{
        try {

        const {data} = await axios.get(API_URL)

        set({products:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    getProductsById:async(id)=>{
        try {

        const {data} = await axios.get(`${API_URL}/${id}`)
        set({products:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    createProducts:async(data)=>{
        try {

        const response = await axios.post(API_URL,data)

        set((state)=>({
            products:[...state.products,response.data[0]]
        }))
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteProducts:async(id)=> {
        try {

        await axios.delete(`${API_URL}/${id}`)

        set((state)=>({
            products:state.products.filter((item)=> item?.id != id)
        }))
            
        } catch (error) {
            console.log(error)
        }
    },

    saveProducts:async(data,id)=> {
        try {

        const response = await axios.put(data,`${API_URL}/${id}`)

        set((state)=>({
            products:state.products.map((item)=> item?.id == id ? response.data[0] : item)
        }))
            
        } catch (error) {
            console.log(error)
        }
    }

})