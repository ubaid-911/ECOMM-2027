import { supabase } from "../db/connection.js";

export const getOrder = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("* , users(*)");

    if (error) {
      console.log("Supabase Error:", error);

      return res.status(500).json({
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("orders")
      .select("* , users(*)")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(500).json({ message: `These is an ${error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          userId,
          products,
        },
      ])
      .select();

    if (error) {
      console.log("Supabase Error:", error);

      return res.status(500).json({
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.log("Server Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ message: `These is an ${error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
