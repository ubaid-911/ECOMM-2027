import { supabase } from "../db/connection.js";

export const getUser = async(req,res)=> {

    try {

        const {data,error} = await supabase.from("users").select("*");

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
    }

}

export const getUserById = async(req,res)=> {

    try {

    const {id} = req.params;
    const {data,error} = await supabase.from("users").eq("id",id).select("*");

      if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);
        
        
    } catch (error) {
        console.log(error)
    }

}

export const updateUser = async(req,res)=> {

    try {

    const {name,email,address,phoneNo,password,city,state,country,avatar} = req.body;
    const {id} = req.params;
    const {data,error} = await supabase.from("users")
    .update({name,email,address,phoneNo,password,city,state,country,avatar})
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

export const deleteUser = async(req,res)=> {

    try {
        
        const {id} = req.params;
        const {data,error} = await supabase.from("users").delete().eq("id",id).select();

        if(error) {
            return res.status(500).json({message:`These is an ${error}` });
        }

        return res.status(200).json(data);     

    } catch (error) {
        console.log(error)
    }

}