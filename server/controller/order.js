import { supabase } from "../db/connection.js";

export const getOrder = async(req,res)=> {

    try {

        const {data,error} = await supabase.from("order").select("*");

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
    }

}

export const getOrderById = async(req,res)=> {

    try {

    const {id} = req.params;
    const {data,error} = await supabase.from("order").eq("id",id).select("*");

      if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
        
    } catch (error) {
        console.log(error)
    }

}

export const createOrder = async(req,res)=> {
    
    try {
        
    const {userId,productId} = req.body;
    const {data,error} = await supabase.from("order").insert([{userId,productId}]).select();

       if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log(error)
    }
}

export const deleteOrder = async(req,res)=> {

    try {
        
        const {id} = req.params;
        const {data,error} = await supabase.from("order").delete().eq("id",id).select();

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);     

    } catch (error) {
        console.log(error)
    }

}