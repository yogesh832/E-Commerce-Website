import React from "react";

const Login = () => {
  const [currentState, setCurrentState] = React.useState("Login");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(`${currentState} form submitted`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        <>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
            placeholder="Username"
            required
          />
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password?</p>
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create an account
            </p>
          </div>
        </>
      ) : (
        <>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800 placeholder-gray-500"
            placeholder="Password"
            required
          />
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login
          </p>
        </>
      )}

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState}
      </button>
    </form>
  );
};

export default Login;
