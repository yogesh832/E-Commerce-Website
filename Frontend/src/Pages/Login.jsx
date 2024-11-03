import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contaxt/ShopContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS for styling
import { backendUrl } from "../../../admin/src/App";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`${currentState} form submitted`);

    try {
      if (currentState === "Sign up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registered successfully!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <ToastContainer /> {/* Toast notifications container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "Sign up" ? (
          <>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
              placeholder="Username"
              required
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
              placeholder="Email"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
              placeholder="Password"
              required
            />
            <div className="w-full flex justify-between text-sm mt-[-8px]">
              <p
                className="cursor-pointer"
                onClick={() => setCurrentState("Login")}
              >
                Already have an account? Login
              </p>
            </div>
          </>
        ) : (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
              placeholder="Email"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
              placeholder="Password"
              required
            />
            <div className="w-full flex justify-between text-sm mt-[-8px]">
              <p className="cursor-pointer">Forgot your password?</p>
              <p
                className="cursor-pointer"
                onClick={() => setCurrentState("Sign up")}
              >
                Create an account
              </p>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-black text-white font-light px-8 py-2 mt-4"
        >
          {currentState}
        </button>
      </form>
    </>
  );
};

export default Login;
