import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Practice = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNo: "",
    city: "",
    state: "",
    country: "",
    avatar: "",
  });

  const signUp = useAuthStore((state) => state.signUp);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signUp(formData);
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your Name"
          required
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          required
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your Password"
          required
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="text"
          name="address"
          value={formData.address}
          placeholder="Enter your Address"
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="tel"
          name="phoneNo"
          value={formData.phoneNo}
          placeholder="Enter your Phone No"
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="text"
          name="city"
          value={formData.city}
          placeholder="Enter your City"
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="text"
          name="state"
          value={formData.state}
          placeholder="Enter your State"
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="text"
          name="country"
          value={formData.country}
          placeholder="Enter your Country"
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <input
          onChange={handleChange}
          type="text"
          name="avatar"
          value={formData.avatar}
          placeholder="Enter your Avatar URL"
          className="p-2 m-2 border-black border-2 rounded-[10px]"
        />

        <button
          onClick={handleSignUp}
          className="p-2 m-2 border-black border-2 rounded-[10px] cursor-pointer"
        >
          Sign Up
        </button>
    </div>
  );
};

export default Practice;