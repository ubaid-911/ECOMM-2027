import { supabase } from "../db/connection.js";

export const getProduct = async(req,res)=> {

    try {

        const {data,error} = await supabase.from("products").select("*");

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
    }

}

export const getProductById = async(req,res)=> {

    try {

    const {id} = req.params;
    const {data,error} = await supabase.from("products").eq("id",id).select("*");

      if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
        
    } catch (error) {
        console.log(error)
    }

}

export const createProduct = async(req,res)=> {
    
    try {
        
    const {name,discription,rating,price,images} = req.body;
    const {data,error} = await supabase.from("products").insert([{name,discription,rating,price,images}]).select();

       if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async(req,res)=> {

    try {

    const {name,discription,rating,price,images} = req.body;
    const {id} = req.params;
    const {data,error} = await supabase.from("products")
    .update({name,discription,rating,price,images})
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

export const deleteProduct = async(req,res)=> {

    try {
        
        const {id} = req.params;
        const {data,error} = await supabase.from("products").delete().eq("id",id).select();

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);     

    } catch (error) {
        console.log(error)
    }

}