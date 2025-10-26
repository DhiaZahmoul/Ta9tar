"use client";
import React from "react";
import RegisterForm from "@/components/forms/registerForm";
import './register.css';


export default function Page() {
  return (
    <div className="register-page">
     
      <div className="register-form">
        <RegisterForm />
      </div>
      <div className="register-image">
        <img src="/backGround.png" alt="Background" />
      </div>
    </div>
  );
}
