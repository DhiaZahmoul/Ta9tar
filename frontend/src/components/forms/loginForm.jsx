// frontend/src/components/forms/loginForm.jsx
// LoginForm component
//Handles user login functionality
//Sends login data to backend API
//Simple and functional for now
//css Handled globally (in the login page) for consistency
//Handles storing user ID in Redux and localStorage
//VERY IMPORTANT for authentication flow
//Might import additional security features later

"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all the fields");
      return;
    }

    try {
      dispatch(loginStart());

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(loginFailure(data.message || "Login failed"));
        setError(data.message || "Login failed");
        return;
      }

      console.log("Login successful:", data);

      // Store token if needed
      if (data.token) localStorage.setItem("token", data.token);

      // Store only user ID in Redux
      if (data.user && data.user._id) {
        dispatch(loginSuccess(data.user._id));
        localStorage.setItem("currentUserId", data.user._id);
        console.log("User ID stored in Redux:", data.user._id);
      } else {
        console.warn("No user object or _id found in response.");
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Error during login:", err);
      dispatch(loginFailure("An error occurred. Please try again."));
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Please enter your email"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Please enter your password"
          onChange={handleChange}
        />

        <button type="submit">Sign in</button>

        <p>
          Still don’t have an account? <a href="/register">Join us here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
