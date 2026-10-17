import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db/connection.js";

const secret = "qstore";

// SIGN IN
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: oldUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (!oldUser) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "7d",
    });

    // Never send the hashed password to the client.
    const { password: _, ...result } = oldUser;

    return res.status(200).json({ result, token });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// SIGN UP
export const signup = async (req, res) => {
  const {
    name,

    email,

    address,

    phoneNo,

    password,

    city,

    state,

    country,

    avatar,
  } = req.body;

  try {
    const { data: oldUser, error: findError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

 if (findError) {
  console.error("Find user error:", findError);

  return res.status(500).json({
    message: "Database error while checking user",
    error: findError.message,
  });

    }

    if (oldUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        name,

        email,

        address,

        phoneNo,

        password: hashedPassword,

        city,

        state,

        country,

        avatar,
      })
      .select()
      .single();

    if (insertError) {
      // Also handles a duplicate email if concurrent requests race.
      if (insertError.code === "23505") {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      console.error(insertError);

      return res.status(500).json({
        message: "Database error",
      });
    }

    const token = jwt.sign({ email: newUser.email, id: newUser.id }, secret, {
      expiresIn: "7d",
    });

    const { password: _, ...result } = newUser;

    return res.status(201).json({ result, token });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
