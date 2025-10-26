"use client";
import React from "react";
import LoginForm from "@/components/forms/loginForm";
import './login.css';

export default function page() {
    return (
        <div className="login-page">
            <img src='/backGround.png' alt='Background' className='auth-image' />
            <LoginForm />
        </div>
    );
}
