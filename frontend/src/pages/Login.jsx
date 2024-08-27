import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

export default function Login() {
  const {setUser} = useContext(UserContext);

  const navigte = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setUser(response.data)//update user context
        setData({});
        navigte("/dashboard");
      }
    } catch (error) {
      console.error("Login Failed:",error);
    }
  };

  return (
    <div className="bg-darkGray flex flex-col justify-center items-center h-screen">
      <h1 className="text-white font-bold mb-4 text-3xl">
        Login
      </h1>
      <form
        onSubmit={loginUser}
        className="bg-blue-500 p-6 rounded-lg w-80 border border-white"
      >
        <div className="text-center ">
          <label className="block text-white font-bold">Email</label>
          <input
            type="text"
            placeholder="Enter Email.."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="block w-full p-2 border border-blue-700 rounded mb-4 mt-2 hover:bg-gray-200 duration-300"
          />
        </div>
        <div className="text-center">
          <label className="block text-white font-bold">Password</label>
          <input
            type="text"
            placeholder="Enter Password.."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full p-2 border border-blue-700 rounded mb-4 mt-2 shawdow-lg hover:bg-gray-200 duration-300"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="border text-white font-bold p-2 w-40 border-blue-700 hover:bg-blue-700 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
