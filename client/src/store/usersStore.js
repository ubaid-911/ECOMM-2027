import {create} from "zustand"
import axios from "axios"

const API_URL = "http://localhost:5000/api/v1/users";

export const useUsersStore = create((set)=>({

    users:[],
    getUsers:async()=>{
        try {

        const {data} = await axios.get(API_URL)

        set({users:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    getUsersById:async(id)=>{
        try {

        const {data} = await axios.get(`${API_URL}/${id}`)
        set({users:data})
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteUsers:async(id)=> {
        try {

        await axios.delete(`${API_URL}/${id}`)

        set((state)=>({
            users:state.users.filter((item)=> item?.id != id)
        }))
            
        } catch (error) {
            console.log(error)
        }
    },

    saveUsers:async(data,id)=> {
        try {

        const response = await axios.put(data,`${API_URL}/${id}`)

        set((state)=>({
            users:state.users.map((item)=> item?.id == id ? response.data[0] : item)
        }))
            
        } catch (error) {
            console.log(error)
        }
    }

}))