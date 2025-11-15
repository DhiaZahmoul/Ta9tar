"use client";
import React from "react";
import RegisterForm from "@/components/forms/registerForm";
import GhostCursor from "@/components/animated/ta9tar";
import './register.css';

// Import static image
import back from "../../../public/back.png";

export default function Page() {
  return (
    <div className="register-page">

      {/* LEFT SIDE: Image */}
      <div className="left-side">
        <img 
          src='/back.png' 
          alt="Background" 
          className="left-image"
        />
      </div>

      {/* Ghost Cursor applied to whole page */}
     <GhostCursor
        color="#DA9100"          // Harvest gold, matches your text color
        brightness={1.2}         // slightly less bright for subtlety
        edgeIntensity={0.2}      // softer edges
        trailLength={60}         // shorter, subtle trail
        inertia={0.6}            // smooth trailing
        grainIntensity={0.01}    // minimal grain
        bloomStrength={0.15}     // softer glow
        bloomRadius={1.0}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />

      {/* RIGHT SIDE: Register Form */}
      <div className="register-form">
        <RegisterForm />
      </div>
    </div>
  );
}
