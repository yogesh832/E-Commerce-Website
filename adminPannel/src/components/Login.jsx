import React, { useState } from 'react';
import axios from "axios";


import { backendUrl } from '../App'; // Import the backend URL
import { toast } from 'react-toastify';

const Login = ({ onLogin , setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
   
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
if (response.data.token) {
  setToken(response.data.token); // Save the token in the local storage for future use
}else{
  toast.error(response.data.message)
}
      const token = response.data.token;
      onLogin(token);
      
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
  toast.error(error.message)

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-5'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'  
              type="email" 
              placeholder='Your@gmail.com' 
              required 
              name="email" 
              id="email" 
            />
          </div>
          <div className="mb-3">
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input  
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
              type="password" 
              placeholder='Enter Your Password' 
              required 
              name="password" 
              id="password" 
            />
          </div>
          <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md bg-black text-white'>Login</button>

          {/* Display error message if login fails */}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
