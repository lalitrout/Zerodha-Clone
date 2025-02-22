import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://zerodha-clone-6f98.onrender.com"; // Updated API URL

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.post(`${API_URL}/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(data.message);
      setSuccess(data.success);

      if (data.success) {
        setTimeout(() => {
          window.location.href = "https://dashboard-8jy230lg2-lalit-routs-projects.vercel.app/";
        }, 2000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage(error.response?.data?.message || "Signup failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Signup To Explore Kite <img src="/ZerodhaKiteLogo.png" alt="" style={{width: "2rem"}}/></h2>

        {message && (
          <div className={`alert ${success ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
