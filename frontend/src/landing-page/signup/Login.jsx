import React, { useState } from "react";
import axios from "axios";

const API_URL ="https://zerodha-clone-6f98.onrender.com"; // Update with your Render backend URL

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const { data } = await axios.post(`${API_URL}/login`, formData, {
        withCredentials: true, // Ensure cookies (if any) are sent
        headers: { "Content-Type": "application/json" },
      });

      setMessage(data.message);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "https://dashboard-plum-iota.vercel.app/"; // Redirect after login
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong.");
      setSuccess(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login To Explore Kite <img src="/ZerodhaKiteLogo.png" alt="" style={{width: "2rem"}}/></h2>

        {message && (
          <div className={`alert ${success ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
