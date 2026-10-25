"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ParticleNetwork = dynamic(
  () => import("@designcodeio/threeui/components/ParticleNetwork").then((mod) => mod.ParticleNetwork),
  { ssr: false }
);

interface ThreeUIParticleFieldProps {
  opacity?: number;
  speed?: number;
  className?: string;
}

export default function ThreeUIParticleField({
  opacity = 0.45,
  speed = 0.8,
  className = "",
}: ThreeUIParticleFieldProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`threeui-particle-field ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
        overflow: "hidden",
      }}
    >
      <ParticleNetwork
        mode="dark"
        speed={speed}
        density={0.9}
        opacity={1}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
