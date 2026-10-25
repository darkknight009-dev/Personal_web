"use client";

import React from "react";

interface AICallTriggerButtonProps {
  className?: string;
  variant?: "header" | "hero" | "subtle";
  children?: React.ReactNode;
}

export default function AICallTriggerButton({
  className = "",
  variant = "header",
  children,
}: AICallTriggerButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-call"));
    }
  };

  if (variant === "header") {
    return (
      <button
        onClick={handleClick}
        className={`header-ai-pill ${className}`}
        aria-label="Call Ishaan AI Twin"
      >
        <span className="beacon" />
        <span style={{ fontWeight: 600 }}>AI TWIN</span>
        <span style={{ color: "var(--accent)" }}>🎙️</span>
      </button>
    );
  }

  if (variant === "hero") {
    return (
      <button
        onClick={handleClick}
        className={`hero-ai-btn ${className}`}
      >
        <span className="beacon" />
        <span>TALK WITH AI TWIN</span>
        <span>↗</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`header-ai-pill ${className}`}
    >
      {children || "Launch AI Call ↗"}
    </button>
  );
}
