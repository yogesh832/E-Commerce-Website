import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar.jsx";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom"; // Add Navigate
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./Components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Set the backend URL
export const backendUrl = "https://e-commerce-website-o8xx.onrender.com"; // Ensure this matches your backend's actual URL
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {token === "" ? (
        <Login onLogin={handleLogin} setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                {/* Redirect root to /order when logged in */}
                <Route path="/" element={<Navigate to="/order" />} />

                {/* Define other routes */}
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/order" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
