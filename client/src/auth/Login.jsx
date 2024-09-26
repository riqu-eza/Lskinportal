import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/header";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      // Handle login success (e.g., save token, redirect)
      navigate("/home");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="w-full  p-8  ">
        <Header/>
        <h2 className="text-2xl font-bold p-3 text-center">Login</h2>
        <h3 className="text-xl text-center p-4 text-[#BFA181]">
          Sign in with your email and password.
        </h3>
        <div className="  " > 
        <form onSubmit={handleLogin} className=" max-w-md text-center ml-[9.5cm]   space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
