import { supabase } from "../db/connection.js";

export const getCart = async(req,res)=> {

    try {

        const {data,error} = await supabase.from("cart").select("*");

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }
 
        return res.status(200).json(data);
          
    } catch (error) {
        console.log(error);
    }

}

export const getCartById = async(req,res)=> {

    try {

    const {id} = req.params;
    const {data,error} = await supabase.from("cart").select("* , products(*), users(*)").eq("id",id).single();

      if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
        
    } catch (error) {
        console.log(error)
    }

}

export const createCart = async(req,res)=> {
    
    try {
        
    const {userId,productId} = req.body;
    const {data,error} = await supabase.from("cart").insert([{userId,productId}]).select();

       if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log(error)
    }
}

export const updateCart = async(req,res)=> {

    try {

    const {userId,productId} = req.body;
    const {id} = req.params;
    const {data,error} = await supabase.from("cart")
    .update({userId,productId})
    .eq("id",id)
    .select();

      if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
        
    } catch (error) {
        console.log(error)
    }

}

export const deleteCart = async(req,res)=> {

    try {
        
        const {id} = req.params;
        const {data,error} = await supabase.from("cart").delete().eq("id",id).select();

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);     

    } catch (error) {
        console.log(error)
    }

}