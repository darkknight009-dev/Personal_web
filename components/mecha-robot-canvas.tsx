"use client";

import React, { useEffect, useRef, useState } from "react";

export type RobotState = "idle" | "listening" | "thinking" | "speaking" | "disconnected";

interface MechaRobotCanvasProps {
  state: RobotState;
  volumeLevel?: number; // 0.0 to 1.0 from Vapi
  isMuted?: boolean;
  className?: string;
}

export default function MechaRobotCanvas({
  state = "idle",
  volumeLevel = 0,
  isMuted = false,
  className = "",
}: MechaRobotCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const currentVolumeRef = useRef(0);
  const [fps, setFps] = useState(60);

  // Smooth volume transition and sanitize against NaN
  useEffect(() => {
    const safe = Number.isFinite(volumeLevel) ? Math.max(0, Math.min(1, volumeLevel)) : 0;
    currentVolumeRef.current = safe;
  }, [volumeLevel]);

  // Track cursor for pupil and head parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;

    // Use ResizeObserver strictly on container (never canvas) to prevent layout loops
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      timeRef.current += dt;
      const t = timeRef.current;

      // FPS tracking
      frameCount++;
      if (now - fpsTimer > 1000) {
        setFps(Math.round((frameCount * 1000) / (now - fpsTimer)));
        frameCount = 0;
        fpsTimer = now;
      }

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const { width, height } = canvas;
      if (width <= 0 || height <= 0) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // 1. HARD RESET ALL TRANSFORMS (Guarantees zero zoom-in accumulation)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Solid background fill matching #151513 (Guarantees never turns white)
      ctx.fillStyle = "#151513";
      ctx.fillRect(0, 0, width, height);

      // Safe normalized volume calculation
      const rawVol = currentVolumeRef.current;
      const effectiveVol =
        state === "speaking"
          ? Math.max(rawVol, 0.18 + Math.sin(t * 16) * 0.12)
          : state === "listening"
          ? rawVol * 0.4
          : 0;

      // Centered coordinate space
      ctx.save();
      const minDimension = Math.min(width, height);
      const scale = (minDimension / 800);
      ctx.translate(width / 2, height / 2);
      ctx.scale(scale, scale);

      // Parallax head offsets
      const headTiltX = mouseRef.current.x * 20;
      const headTiltY = mouseRef.current.y * 14;

      // Palette
      const inkCard = "#181816";
      const inkPlate = "#22221f";
      const inkPlateLight = "#2d2d28";
      const paper = "#ebe7dc";
      const lineMuted = "rgba(235, 231, 220, 0.18)";
      const lineSharp = "rgba(235, 231, 220, 0.45)";

      let accentColor = "#cf6e4a"; // terracotta
      let eyeColor = "#50d890"; // emerald
      if (state === "speaking") {
        accentColor = "#e86a42";
        eyeColor = "#ffb347";
      } else if (state === "listening") {
        accentColor = "#4ea8de";
        eyeColor = "#48cae4";
      } else if (state === "thinking") {
        accentColor = "#f4a261";
        eyeColor = "#f4a261";
      } else if (state === "disconnected") {
        accentColor = "#687487";
        eyeColor = "#555555";
      }

      // --- BACKGROUND SENSOR RINGS ---
      ctx.save();
      ctx.strokeStyle = "rgba(235, 231, 220, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 360, 0, Math.PI * 2);
      ctx.arc(0, 0, 280, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating mechanical outer sensor ring
      ctx.save();
      ctx.rotate(t * 0.12);
      ctx.setLineDash([4, 16]);
      ctx.strokeStyle = lineMuted;
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Counter-rotating gear ring
      ctx.save();
      ctx.rotate(-t * 0.18);
      ctx.setLineDash([8, 24]);
      ctx.strokeStyle = "rgba(207, 110, 74, 0.22)";
      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      // --- ROBOT HEAD RIG (Cursor Parallax + Breath) ---
      ctx.save();
      ctx.translate(headTiltX, headTiltY);
      const breath = Math.sin(t * 2) * 3.5;
      ctx.translate(0, breath);

      // Neck Hydraulic Cylinder
      ctx.fillStyle = inkPlate;
      ctx.strokeStyle = lineSharp;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-70, 190, 140, 85, 8);
      ctx.fill();
      ctx.stroke();

      // Neck conduits
      for (let i = -50; i <= 50; i += 25) {
        ctx.strokeStyle = "rgba(235, 231, 220, 0.25)";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(i, 198);
        ctx.lineTo(i + Math.sin(t * 3 + i) * 2, 268);
        ctx.stroke();
      }

      // Side Cooling Pods (Left & Right Turbines)
      const drawTurbine = (side: number) => {
        ctx.save();
        ctx.translate(side * 220, -10);
        ctx.fillStyle = inkCard;
        ctx.strokeStyle = lineMuted;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-35, -90, 70, 180, 10);
        ctx.fill();
        ctx.stroke();

        for (let y = -70; y <= 70; y += 14) {
          ctx.strokeStyle = lineMuted;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-25, y);
          ctx.lineTo(25, y);
          ctx.stroke();
        }

        // Micro-fan
        ctx.save();
        ctx.rotate(side * t * 7 + effectiveVol * 14);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        for (let b = 0; b < 4; b++) {
          ctx.rotate(Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, 20);
          ctx.stroke();
        }
        ctx.restore();

        ctx.fillStyle = paper;
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(side === -1 ? "POD // L" : "POD // R", 0, 76);
        ctx.restore();
      };
      drawTurbine(-1);
      drawTurbine(1);

      // Main Outer Skull Armor (Hexagonal Faceted Mechanical Chassis)
      ctx.fillStyle = inkCard;
      ctx.strokeStyle = lineSharp;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-170, -180);
      ctx.lineTo(170, -180);
      ctx.lineTo(195, -70);
      ctx.lineTo(185, 120);
      ctx.lineTo(130, 200);
      ctx.lineTo(-130, 200);
      ctx.lineTo(-185, 120);
      ctx.lineTo(-195, -70);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Top Forehead Crest
      ctx.fillStyle = inkPlateLight;
      ctx.strokeStyle = lineMuted;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-110, -180);
      ctx.lineTo(110, -180);
      ctx.lineTo(80, -135);
      ctx.lineTo(-80, -135);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hardware Plate Labeling
      ctx.fillStyle = paper;
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("UNIT-IR01 // NEURAL SYNTHESIZER", 0, -155);

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(65, -157, 3, 0, Math.PI * 2);
      ctx.fill();

      // Precision Screws on Armor
      const screws = [
        [-150, -165], [150, -165],
        [-175, 90], [175, 90],
        [-115, 180], [115, 180],
      ];
      screws.forEach(([sx, sy]) => {
        ctx.fillStyle = "#333330";
        ctx.strokeStyle = lineMuted;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sx - 3, sy);
        ctx.lineTo(sx + 3, sy);
        ctx.stroke();
      });

      // --- OCULAR ARRAY / VISOR (The Eyes) ---
      const visorY = -40;
      ctx.fillStyle = "#11110f";
      ctx.strokeStyle = lineMuted;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-150, visorY - 50, 300, 95, 8);
      ctx.fill();
      ctx.stroke();

      // Visor grid
      ctx.save();
      ctx.strokeStyle = "rgba(235, 231, 220, 0.07)";
      ctx.lineWidth = 1;
      for (let vx = -140; vx <= 140; vx += 20) {
        ctx.beginPath();
        ctx.moveTo(vx, visorY - 45);
        ctx.lineTo(vx, visorY + 40);
        ctx.stroke();
      }
      ctx.restore();

      // Left & Right Eyes
      const eyeSpacing = 72;
      const eyeTrackingX = mouseRef.current.x * 14;
      const eyeTrackingY = mouseRef.current.y * 10;
      const blinkCycle = Math.sin(t * 0.8);
      const isBlinking = blinkCycle > 0.985;

      const drawEye = (xCenter: number) => {
        ctx.save();
        ctx.translate(xCenter, visorY);

        ctx.strokeStyle = lineSharp;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 34, 0, Math.PI * 2);
        ctx.stroke();

        ctx.save();
        ctx.rotate(t * (xCenter > 0 ? 1 : -1));
        ctx.setLineDash([2, 8]);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (!isBlinking) {
          const px = eyeTrackingX;
          const py = eyeTrackingY;

          const grad = ctx.createRadialGradient(px, py, 2, px, py, 20);
          grad.addColorStop(0, eyeColor);
          grad.addColorStop(0.4, accentColor);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, 18, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = paper;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px - 8, py);
          ctx.lineTo(px - 3, py);
          ctx.moveTo(px + 3, py);
          ctx.lineTo(px + 8, py);
          ctx.moveTo(px, py - 8);
          ctx.lineTo(px, py - 3);
          ctx.moveTo(px, py + 3);
          ctx.lineTo(px, py + 8);
          ctx.stroke();
        } else {
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-24, 0);
          ctx.lineTo(24, 0);
          ctx.stroke();
        }

        ctx.restore();
      };

      drawEye(-eyeSpacing);
      drawEye(eyeSpacing);

      // Center nose sensor plate
      ctx.fillStyle = inkPlate;
      ctx.strokeStyle = lineMuted;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-15, visorY - 45);
      ctx.lineTo(15, visorY - 45);
      ctx.lineTo(10, visorY + 50);
      ctx.lineTo(-10, visorY + 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // --- ACOUSTIC OSCILLOSCOPE MOUTH ---
      const mouthY = 115;
      const jawDrop = effectiveVol * 16;

      ctx.save();
      ctx.translate(0, jawDrop);

      ctx.fillStyle = inkPlate;
      ctx.strokeStyle = lineSharp;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-110, mouthY + 15);
      ctx.lineTo(110, mouthY + 15);
      ctx.lineTo(85, mouthY + 60);
      ctx.lineTo(-85, mouthY + 60);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      for (let jg = -60; jg <= 60; jg += 15) {
        ctx.strokeStyle = lineMuted;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(jg, mouthY + 28);
        ctx.lineTo(jg, mouthY + 48);
        ctx.stroke();
      }
      ctx.restore();

      // Acoustic Chamber Screen
      ctx.fillStyle = "#0a0a08";
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-100, mouthY - 30, 200, 46 + jawDrop * 0.5, 6);
      ctx.fill();
      ctx.stroke();

      // CRT Scanlines
      ctx.save();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 1;
      for (let sl = mouthY - 28; sl <= mouthY + 18 + jawDrop; sl += 3) {
        ctx.beginPath();
        ctx.moveTo(-95, sl);
        ctx.lineTo(95, sl);
        ctx.stroke();
      }
      ctx.restore();

      // Realtime Audio Oscilloscope Waveform
      ctx.save();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const waveWidth = 180;
      const numPoints = 32;
      const startX = -waveWidth / 2;
      const step = waveWidth / numPoints;

      for (let p = 0; p <= numPoints; p++) {
        const px = startX + p * step;
        let py = mouthY - 8 + jawDrop * 0.2;

        if (state === "speaking") {
          const primaryWave = Math.sin(p * 0.8 + t * 24) * (effectiveVol * 20 + 3);
          const harmonic = Math.cos(p * 1.5 - t * 30) * (effectiveVol * 10);
          py += primaryWave + harmonic;
        } else if (state === "listening") {
          py += Math.sin(p * 0.5 + t * 8) * (3 + effectiveVol * 14);
        } else if (state === "thinking") {
          py += ((p % 6 < 3 ? 1 : -1) * 5) * Math.sin(t * 10);
        } else {
          const dist = Math.abs(p - numPoints / 2);
          if (dist < 4) {
            py += Math.sin(t * 6 + p) * 4;
          }
        }

        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      // Equalizer Spectrum Bars
      const numBars = 16;
      const eqWidth = 160;
      const barW = eqWidth / numBars - 3;
      for (let b = 0; b < numBars; b++) {
        const bx = -eqWidth / 2 + b * (barW + 3);
        const barHeightFactor =
          state === "speaking"
            ? Math.abs(Math.sin(b * 0.7 + t * 15)) * (effectiveVol * 22 + 4)
            : state === "listening"
            ? Math.abs(Math.sin(b * 0.4 + t * 5)) * 5
            : 2;

        ctx.fillStyle = b % 2 === 0 ? accentColor : paper;
        ctx.fillRect(bx, mouthY + 12 + jawDrop * 0.2, barW, -barHeightFactor);
      }

      ctx.restore(); // end head translation

      // --- TACTICAL CORNER TELEMETRY ---
      ctx.save();
      ctx.fillStyle = paper;
      ctx.font = "10px monospace";
      ctx.textAlign = "left";

      ctx.fillText(`SYS // ONLINE`, -370, -350);
      ctx.fillText(`AUDIO_PIPE: ${state.toUpperCase()}`, -370, -332);
      ctx.fillText(`GAIN: ${(effectiveVol * 100).toFixed(0)}%`, -370, -314);

      ctx.textAlign = "right";
      ctx.fillText(`FPS: ${fps}`, 370, -350);
      ctx.fillText(`RATE: 48kHz`, 370, -332);
      ctx.fillText(`PROTOCOL: VAPI`, 370, -314);

      ctx.restore();

      ctx.restore(); // end centered coordinate space

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [state, fps]);

  return (
    <div ref={containerRef} className={`mecha-canvas-wrap ${className}`}>
      <canvas ref={canvasRef} className="mecha-canvas-el" />
    </div>
  );
}
