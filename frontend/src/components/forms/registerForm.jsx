"use client";

import React from "react";
import { useState } from "react";

const RegisterForm = () => {

    const [registerData, setRegisterData]= useState({username:"",email:"",password:""})
    const [error, setError]= useState("")

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!registerData.username || !registerData.email || !registerData.password) {
    setError("All fields are required");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData)
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    console.log("Registration successful:", data);
    // Optionally redirect the user after success
    // e.g., router.push("/login")
  } catch (err) {
    console.error("Error:", err);
    setError("Network error. Please try again later.");
  }
};

  const handleChange = (e) => {
      setRegisterData({
          ...registerData,
          [e.target.name]: e.target.value,
      });
  };


  return (
    <div className="register-container">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        <form className="register-form">
            <label>Username</label>
            <input
            type="text"
            value={registerData.username}
            placeholder="Choose  a username"
            name="username"
            onChange={handleChange}>
            </input>

            <label>Email</label>
            <input 
            type="email"
            value={registerData.email}
            placeholder="Please enter your email"
            name="email"
            onChange={handleChange}>
            </input>
            
            <label>Password</label>
            <input 
            type="password"
            value={registerData.password}
            placeholder="Please enter your password"
            name="password"
            onChange={handleChange}>
            </input>
            <button type="submit" onClick={handleSubmit}>Sign up</button>

        </form>

        <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default RegisterForm;