"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

// Dynamically import UplinkLoader with SSR false to ensure WebGL/browser safety
const UplinkLoader = dynamic(
  () => import("@designcodeio/threeui/components/UplinkLoader").then((mod) => mod.UplinkLoader),
  { ssr: false }
);

interface ThreeUILoaderProps {
  onComplete?: () => void;
}

export default function ThreeUILoader({ onComplete }: ThreeUILoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYS.LINK // IR-01");
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already saw the loader in this session
    const seen = sessionStorage.getItem("ir_loader_seen");
    if (seen === "true") {
      setIsDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    setMounted(true);

    const steps = [
      { p: 18, msg: "CALIBRATING QUANTUM VORTEX..." },
      { p: 37, msg: "SYNCHRONIZING THREEUI 3D SHADERS..." },
      { p: 64, msg: "MOUNTING NEURAL VAPI WEBRTC PIPELINE..." },
      { p: 89, msg: "OPTIMIZING MECHA AVATAR KINEMATICS..." },
      { p: 100, msg: "SYS.ONLINE // READY TO EXPLORE" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].msg);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          handleDismiss();
        }, 700);
      }
    }, 380);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleDismiss = () => {
    sessionStorage.setItem("ir_loader_seen", "true");
    gsap.to(".threeui-loader-overlay", {
      opacity: 0,
      scale: 1.03,
      duration: 0.65,
      ease: "power2.inOut",
      onComplete: () => {
        setIsDismissed(true);
        if (onComplete) onComplete();
      },
    });
  };

  if (isDismissed || !mounted) return null;

  return (
    <div
      className="threeui-loader-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#030806",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "var(--mono, monospace)",
      }}
    >
      {/* ThreeUI 3D Uplink WebGL Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.82,
          pointerEvents: "none",
        }}
      >
        <UplinkLoader style={{ width: "100%", height: "100%" }} />
      </div>

      {/* Cyber Grid Lines & Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(3, 8, 6, 0.88) 85%)",
          pointerEvents: "none",
        }}
      />

      {/* HUD Info Header */}
      <div
        style={{
          position: "absolute",
          top: "32px",
          left: "36px",
          right: "36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "rgba(235, 231, 220, 0.45)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#cf6e4a",
              boxShadow: "0 0 12px #cf6e4a",
              animation: "pulse 1.5s infinite",
            }}
          />
          <span>ISHAAN RAI // PORTFOLIO CORE v2.6</span>
        </div>
        <span>THREEUI · WEBGL · NEURAL</span>
      </div>

      {/* Center Hologram Text & Progress Bar */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "460px",
          width: "90%",
          textAlign: "center",
          padding: "30px",
          background: "rgba(10, 16, 13, 0.55)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(207, 110, 74, 0.28)",
          borderRadius: "14px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(207, 110, 74, 0.08)",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "#cf6e4a",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 600,
          }}
        >
          [ BOOT SEQUENCE INITIALIZING ]
        </div>

        <h2
          style={{
            fontFamily: "var(--serif, Georgia)",
            fontSize: "clamp(26px, 4vw, 36px)",
            color: "#ebe7dc",
            margin: "0 0 8px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Ishaan Rai<span style={{ color: "#cf6e4a" }}>✳</span>
        </h2>

        <p
          style={{
            color: "rgba(235, 231, 220, 0.65)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            margin: "0 0 22px",
            minHeight: "16px",
          }}
        >
          {statusText}
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "4px",
            background: "rgba(235, 231, 220, 0.12)",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #cf6e4a, #ff9e79)",
              boxShadow: "0 0 14px rgba(207, 110, 74, 0.8)",
              transition: "width 0.35s ease-out",
            }}
          />
        </div>

        {/* Telemetry Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "rgba(235, 231, 220, 0.4)",
            fontSize: "10px",
            letterSpacing: "0.1em",
          }}
        >
          <span>CHITKARA // AI/ML</span>
          <span style={{ color: "#cf6e4a", fontWeight: 600 }}>{progress}%</span>
          <span>PROGRAMMING.COM</span>
        </div>
      </div>

      {/* Manual Skip Button */}
      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          bottom: "32px",
          zIndex: 20,
          background: "transparent",
          border: "1px solid rgba(235, 231, 220, 0.2)",
          color: "rgba(235, 231, 220, 0.6)",
          padding: "8px 18px",
          borderRadius: "20px",
          fontSize: "11px",
          letterSpacing: "0.12em",
          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#cf6e4a";
          e.currentTarget.style.color = "#ebe7dc";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(207, 110, 74, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(235, 231, 220, 0.2)";
          e.currentTarget.style.color = "rgba(235, 231, 220, 0.6)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        SKIP BOOTLOADER →
      </button>
    </div>
  );
}
