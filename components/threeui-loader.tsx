"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

interface ThreeUILoaderProps {
  onComplete?: () => void;
}

const steps = [
  { progress: 22, label: "Preparing the portfolio" },
  { progress: 48, label: "Loading selected work" },
  { progress: 76, label: "Arranging the details" },
  { progress: 100, label: "Ready to explore" },
];

export default function ThreeUILoader({ onComplete }: ThreeUILoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(steps[0].label);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ir_loader_seen") === "true") {
      setIsDismissed(true);
      onComplete?.();
      return;
    }

    setMounted(true);
    let step = 0;
    const interval = window.setInterval(() => {
      const next = steps[step];
      if (!next) {
        window.clearInterval(interval);
        window.setTimeout(dismiss, 450);
        return;
      }
      setProgress(next.progress);
      setStatus(next.label);
      step += 1;
    }, 320);

    function dismiss() {
      sessionStorage.setItem("ir_loader_seen", "true");
      gsap.to(".threeui-loader-overlay", {
        opacity: 0,
        y: -10,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          setIsDismissed(true);
          onComplete?.();
        },
      });
    }

    return () => window.clearInterval(interval);
  }, [onComplete]);

  function handleDismiss() {
    sessionStorage.setItem("ir_loader_seen", "true");
    gsap.to(".threeui-loader-overlay", {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setIsDismissed(true);
        onComplete?.();
      },
    });
  }

  if (isDismissed || !mounted) return null;

  return (
    <div className="threeui-loader-overlay" role="status" aria-live="polite">
      <div className="loader-inner">
        <div className="loader-kicker"><span /> ISHAAN RAI <span className="loader-divider">/</span> PORTFOLIO</div>
        <h2>Good things<br /><em>take curiosity.</em></h2>
        <p className="loader-status">{status}</p>
        <div
          className="loader-progress"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-foot">
          <span>INDIA · 2026</span>
          <span>{String(progress).padStart(2, "0")}%</span>
        </div>
      </div>
      <button className="loader-skip" onClick={handleDismiss}>Skip intro <span>↗</span></button>
    </div>
  );
}
