import {create} from "zustand"
import axios from "axios"

const API_URL = "http://localhost:5000/api/v1/order";

export const useOrderStore = (set)=>({

    order:[],
    getOrder:async()=>{
        try {

        const {data} = await axios.get(API_URL)

        set({order:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    getOrderById:async(id)=>{
        try {

        const {data} = await axios.get(`${API_URL}/${id}`)
        set({order:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    createOrder:async(data)=>{
        try {

        const response = await axios.post(API_URL,data)

        set((state)=>({
            order:[...state.order,response.data[0]]
        }))
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteOrder:async(id)=> {
        try {

        await axios.delete(`${API_URL}/${id}`)

        set((state)=>({
            order:state.order.filter((item)=> item?.id != id)
        }))
            
        } catch (error) {
            console.log(error)
        }
    },



})