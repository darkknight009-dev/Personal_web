"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
export type BrandOrbVariant =
  | "claude"
  | "openai"
  | "codex"
  | "cursor"
  | "gemini"
  | "figma"
  | "framer"
  | "react"
  | "github"
  | "linkedin"
  | "email"
  | string;

const ThreeUIBrandOrbs = dynamic(
  () => import("@designcodeio/threeui/components/BrandOrbs").then((mod) => mod.BrandOrbs),
  { ssr: false }
);

interface BrandOrbsViewerProps {
  variant?: BrandOrbVariant;
  size?: "small" | "medium";
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function BrandOrbsViewer({
  variant = "gemini",
  size = "small",
  speed = 1,
  className = "",
  style,
}: BrandOrbsViewerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          width: size === "small" ? "42px" : "80px",
          height: size === "small" ? "42px" : "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(207, 110, 74, 0.3) 0%, transparent 70%)",
          ...style,
        }}
      />
    );
  }

  return (
    <div className={className} style={{ display: "inline-block", ...style }}>
      <ThreeUIBrandOrbs
        variant={variant as any}
        size={size}
        speed={speed}
        mode="dark"
      />
    </div>
  );
}
