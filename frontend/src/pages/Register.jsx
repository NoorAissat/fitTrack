import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="bg-darkGray flex flex-col items-center justify-center h-screen p-4">
      <h1 class="text-5xl font-bold text-white mb-8">
        Welcome to FitTracker!
      </h1>
      <h2 className="text-white font-bold text-3xl mb-4">
        Sign Up
      </h2>
        <form
          onSubmit={registerUser}
          class="bg-blue-500 border border-white p-6 rounded-lg w-80"
        >
          <div className="text-center">
            <label class="block font-bold text-white mb-2 ">Name</label>
            <input
              type="text"
              placeholder="Enter Name.."
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              class="block w-full p-2 border border-blue-500 rounded mb-4 hover:bg-gray-200 duration-300 "
            />
          </div>
          <div className="text-center ">
            <label className="block text-white mb-2 font-bold">Email</label>
            <input
              type="text"
              placeholder="Enter Email.."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="block w-full p-2 border border-blue-500 rounded mb-4 hover:bg-gray-200 duration-300"
            />
          </div>
          <div className="text-center">
            <label className="block text-white mb-2 font-bold ">Password</label>
            <input
              type="text"
              placeholder="Enter Password.."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="block w-full p-2 border border-blue-500 rounded mb-4 hover:bg-gray-200 duration-300"
            />
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="border text-white font-bold p-2 border-blue-700 rounded w-40 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
     
    </div>
  );
}
