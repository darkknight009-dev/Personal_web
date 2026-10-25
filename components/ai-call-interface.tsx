"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import MechaRobotCanvas, { RobotState } from "./mecha-robot-canvas";

interface AICallInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const IDLE_WARNING_DELAY_MS = 45_000;
const IDLE_DISCONNECT_DELAY_MS = 10_000;

function InactivityWarning({
  seconds,
  onContinue,
  onEnd,
}: {
  seconds: number;
  onContinue: () => void;
  onEnd: () => void;
}) {
  return (
    <div className="call-idle-warning" role="alertdialog" aria-modal="true" aria-labelledby="idle-warning-title">
      <div className="call-idle-warning-card">
        <span className="call-idle-warning-kicker">QUIET SESSION</span>
        <h2 id="idle-warning-title">Still there?</h2>
        <p>This call uses paid AI minutes. It will disconnect in {seconds} seconds if there is no activity.</p>
        <div className="call-idle-warning-actions">
          <button type="button" onClick={onContinue}>I’m still here</button>
          <button type="button" onClick={onEnd}>End call now</button>
        </div>
      </div>
    </div>
  );
}

export default function AICallInterface({ isOpen, onClose }: AICallInterfaceProps) {
  // Call State
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "connected" | "ended">("idle");
  const [robotState, setRobotState] = useState<RobotState>("idle");
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [currentCaption, setCurrentCaption] = useState<string>("Initializing Mecha-Unit IR01 neural pipeline...");
  const [transcriptRole, setTranscriptRole] = useState<"assistant" | "user" | "system">("system");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const [inactivitySeconds, setInactivitySeconds] = useState(IDLE_DISCONNECT_DELAY_MS / 1000);

  // Video Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const idleWarningTimerRef = useRef<number | null>(null);
  const idleDisconnectTimerRef = useRef<number | null>(null);
  const idleCountdownTimerRef = useRef<number | null>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const clearInactivityTimers = useCallback(() => {
    if (idleWarningTimerRef.current) clearTimeout(idleWarningTimerRef.current);
    if (idleDisconnectTimerRef.current) clearTimeout(idleDisconnectTimerRef.current);
    if (idleCountdownTimerRef.current) clearInterval(idleCountdownTimerRef.current);
    idleWarningTimerRef.current = null;
    idleDisconnectTimerRef.current = null;
    idleCountdownTimerRef.current = null;
    setShowInactivityWarning(false);
    setInactivitySeconds(IDLE_DISCONNECT_DELAY_MS / 1000);
  }, []);

  const scheduleInactivityWarning = useCallback(() => {
    clearInactivityTimers();
    idleWarningTimerRef.current = window.setTimeout(() => {
      setShowInactivityWarning(true);
      setInactivitySeconds(IDLE_DISCONNECT_DELAY_MS / 1000);
      idleCountdownTimerRef.current = window.setInterval(() => {
        setInactivitySeconds((seconds) => Math.max(0, seconds - 1));
      }, 1000);
      idleDisconnectTimerRef.current = window.setTimeout(() => {
        clearInactivityTimers();
        setCallStatus("ended");
        setRobotState("disconnected");
        setCurrentCaption("Call ended after a period of inactivity.");
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        const activeVapi = vapiRef.current;
        vapiRef.current = null;
        activeVapi?.stop();
        const activeCamera = videoRef.current?.srcObject as MediaStream | null;
        activeCamera?.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
        setIsCameraOn(false);
        setIsMinimized(false);
        onCloseRef.current();
      }, IDLE_DISCONNECT_DELAY_MS);
    }, IDLE_WARNING_DELAY_MS);
  }, [clearInactivityTimers]);

  // Suggested talking points
  const topicChips = [
    "Tell me about Ishaan's background",
    "How was Luxe Health AI built?",
    "Explain your RAG & AI agent work",
    "What hackathons have you won?",
    "Can we discuss a collaboration?",
  ];

  // Fetch credentials securely from server-side session API (never exposed or hardcoded)
  const startCall = useCallback(async () => {
    try {
      setCallStatus("connecting");
      setRobotState("thinking");
      setErrorMessage(null);
      setCurrentCaption("Retrieving secure session from gateway...");
      setTranscriptRole("system");

      const res = await fetch("/api/vapi-session");
      const sessionData = await res.json();

      if (!sessionData.configured || !sessionData.publicKey || !sessionData.assistantId) {
        setCallStatus("idle");
        setRobotState("idle");
        setErrorMessage("Vapi credentials not found in .env.local. Add VAPI_PUBLIC_KEY and VAPI_ASSISTANT_ID to connect.");
        setCurrentCaption("Please set VAPI_PUBLIC_KEY and VAPI_ASSISTANT_ID in .env.local to activate live voice.");
        return;
      }

      const vapi = new Vapi(sessionData.publicKey);
      vapiRef.current = vapi;
      setVapiInstance(vapi);

      vapi.on("call-start", () => {
        setCallStatus("connected");
        setRobotState("idle");
        setCurrentCaption("System online. Mecha-IR01 is listening.");
        setTranscriptRole("system");
        setCallDuration(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);
        scheduleInactivityWarning();
      });

      vapi.on("call-end", () => {
        setCallStatus("ended");
        setRobotState("disconnected");
        setCurrentCaption("Call session concluded. Unit IR-01 in standby.");
        setTranscriptRole("system");
        clearInactivityTimers();
        vapiRef.current = null;
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      });

      vapi.on("speech-start", () => {
        clearInactivityTimers();
        setRobotState("speaking");
        setTranscriptRole("assistant");
      });

      vapi.on("speech-end", () => {
        setRobotState("idle");
        scheduleInactivityWarning();
      });

      vapi.on("volume-level", (volume: number) => {
        const safe = Number.isFinite(volume) ? volume : 0;
        setVolumeLevel(safe);
      });

      vapi.on("message", (msg: any) => {
        if (msg.type === "transcript" && msg.transcript) {
          setCurrentCaption(msg.transcript);
          setTranscriptRole(msg.role === "assistant" ? "assistant" : "user");
          if (msg.role === "user") {
            scheduleInactivityWarning();
            setRobotState("listening");
          }
        }
      });

      vapi.on("error", (err: any) => {
        console.warn("Vapi notice:", err);
        const errMsg = typeof err === "string" ? err : err?.message || "Session ended.";
        if (errMsg.includes("ejection") || errMsg.includes("ended")) {
          setCallStatus("ended");
          setRobotState("disconnected");
          setCurrentCaption("Meeting ended or room closed. Click Reconnect to restart.");
        } else {
          setErrorMessage(errMsg);
        }
      });

      await vapi.start(sessionData.assistantId);
    } catch (err: any) {
      console.warn("Call init notice:", err);
      setCallStatus("ended");
      setRobotState("disconnected");
      setErrorMessage(err.message || "Could not start session.");
      setCurrentCaption("Session ended. Click Reconnect to try again.");
    }
  }, [clearInactivityTimers, scheduleInactivityWarning]);

  const endCall = useCallback(() => {
    clearInactivityTimers();
    if (vapiInstance) {
      try {
        vapiInstance.stop();
      } catch (e) {
        console.warn("Stop error", e);
      }
    }
    vapiRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraOn(false);
    setCallStatus("idle");
    setRobotState("idle");
    onClose();
  }, [vapiInstance, cameraStream, onClose, clearInactivityTimers]);

  const toggleMute = () => {
    if (!vapiInstance) return;
    const nextMuted = !isMuted;
    vapiInstance.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  // Fixed Webcam toggle with guaranteed stream binding to video element
  const toggleCamera = async () => {
    if (isCameraOn) {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
        setCameraStream(null);
      }
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
          audio: false,
        });
        setCameraStream(stream);
        setIsCameraOn(true);
      } catch (e) {
        console.warn("Camera access denied or unavailable", e);
        setIsCameraOn(false);
      }
    }
  };

  // Bind cameraStream directly to videoRef when stream updates
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch((e) => console.warn("Video play notice", e));
    }
  }, [cameraStream, isCameraOn]);

  const sendPromptToAssistant = (promptText: string) => {
    if (!vapiInstance || callStatus !== "connected") return;
    try {
      vapiInstance.send({
        type: "add-message",
        message: {
          role: "user",
          content: promptText,
        },
      });
      setCurrentCaption(promptText);
      setTranscriptRole("user");
      setRobotState("thinking");
      scheduleInactivityWarning();
    } catch (e) {
      console.error("Failed to send message prompt", e);
    }
  };

  // Auto-start when modal opens
  useEffect(() => {
    if (isOpen && callStatus === "idle") {
      startCall();
    }
  }, [isOpen, callStatus, startCall]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (idleWarningTimerRef.current) clearTimeout(idleWarningTimerRef.current);
      if (idleDisconnectTimerRef.current) clearTimeout(idleDisconnectTimerRef.current);
      if (idleCountdownTimerRef.current) clearInterval(idleCountdownTimerRef.current);
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const continueCall = () => {
    scheduleInactivityWarning();
  };

  if (!isOpen) return null;

  // MINIMIZED FLOATING CO-PILOT VIEW
  if (isMinimized) {
    return (
      <aside className="copilot-floating-badge" aria-label="Ishaan AI Co-Pilot">
        <div className="copilot-thumb">
          <MechaRobotCanvas state={robotState} volumeLevel={volumeLevel} isMuted={isMuted} />
        </div>
        <div className="copilot-meta">
          <div className="copilot-meta-top">
            <span>IR-01 // CO-PILOT</span>
            <span style={{ color: "var(--accent)" }}>{formatTimer(callDuration)}</span>
          </div>
          <p className="copilot-state-txt">
            {robotState === "speaking" ? "AI Speaking..." : robotState === "listening" ? "Listening..." : "Active"}
          </p>
        </div>
        <div className="copilot-btn-group">
          <button
            onClick={toggleMute}
            className={`call-hud-action-btn ${isMuted ? "btn-active" : ""}`}
            style={{ padding: "4px 8px", fontSize: "10px" }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "MUTED" : "MIC"}
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="call-hud-action-btn"
            style={{ padding: "4px 8px", fontSize: "10px" }}
            title="Expand Full Video Call"
          >
            EXPAND ↗
          </button>
          <button
            onClick={endCall}
            className="call-hud-action-btn btn-danger"
            style={{ padding: "4px 8px", fontSize: "10px" }}
            title="End Call"
          >
            ✕
          </button>
        </div>
        {showInactivityWarning && (
          <InactivityWarning
            seconds={inactivitySeconds}
            onContinue={continueCall}
            onEnd={endCall}
          />
        )}
      </aside>
    );
  }

  // FULL SCREEN HUD CALL INTERFACE
  return (
    <div className="call-hud-screen" role="dialog" aria-modal="true">
      {/* BACKGROUND INDUSTRIAL GRID */}
      <div className="call-hud-grid-bg" aria-hidden="true" />
      {showInactivityWarning && (
        <InactivityWarning
          seconds={inactivitySeconds}
          onContinue={continueCall}
          onEnd={endCall}
        />
      )}

      {/* TOP TACTICAL BAR */}
      <header className="call-hud-topbar">
        <div className="call-hud-status-group">
          <div className="call-hud-status-indicator">
            <span
              className={`status-beacon ${
                callStatus === "connected"
                  ? "is-connected"
                  : callStatus === "connecting"
                  ? "is-connecting"
                  : "is-ended"
              }`}
            />
            <span>MECHA-UNIT IR01 // LIVE SYNTHESIS</span>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: "var(--paper-muted)",
              borderLeft: "1px solid var(--line-dark)",
              paddingLeft: "14px",
            }}
          >
            GATEWAY: VAPI_WEBRTC
          </span>
        </div>

        <div className="call-hud-controls-group">
          <div className="call-hud-timer-badge">
            {callStatus === "connected" ? formatTimer(callDuration) : callStatus.toUpperCase()}
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="call-hud-action-btn"
          >
            <span>BROWSE SITE WHILE TALKING</span>
            <span>↓</span>
          </button>

          {callStatus === "ended" && (
            <button
              onClick={startCall}
              className="call-hud-action-btn btn-active"
            >
              ↻ RECONNECT
            </button>
          )}

          <button
            onClick={endCall}
            className="call-hud-action-btn btn-danger"
          >
            END CALL ✕
          </button>
        </div>
      </header>

      {/* CENTER STAGE: ROBOT & USER WEBCAM HUD */}
      <main className="call-hud-main-stage">
        {/* ROBOT AVATAR DISPLAY (MAIN SCREEN) */}
        <div className="call-hud-viewport">
          {/* Corner Registration Tags */}
          <span className="call-hud-corner-tag tag-tl">+ CAM_01 // IR01_AVATAR</span>
          <span className="call-hud-corner-tag tag-tr">REC ● 48FPS</span>
          <span className="call-hud-corner-tag tag-bl">STATE: {robotState.toUpperCase()}</span>
          <span className="call-hud-corner-tag tag-br">VOL: {(volumeLevel * 100).toFixed(0)}%</span>

          {/* Bespoke Mecha Robot Canvas (Rock-solid layout & zero zoom loop) */}
          <MechaRobotCanvas
            state={robotState}
            volumeLevel={volumeLevel}
            isMuted={isMuted}
          />

          {/* USER WEBCAM PIP WINDOW */}
          <div className="call-hud-webcam-box">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                display: isCameraOn ? "block" : "none",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              className="call-hud-webcam-video"
            />
            {!isCameraOn && (
              <div className="call-hud-webcam-standby">
                <div style={{ fontSize: "16px", marginBottom: "2px" }}>👤</div>
                <span style={{ letterSpacing: "0.08em" }}>USER FEED</span>
                <span style={{ opacity: 0.5 }}>CAM OFF</span>
              </div>
            )}
            <div className="call-hud-webcam-tag">
              {isCameraOn ? "LIVE" : "STANDBY"}
            </div>
          </div>

          {/* DYNAMIC REAL-TIME TRANSCRIPT OVERLAY */}
          <div className="call-hud-captions-dock">
            <div className="call-hud-captions-top">
              <span
                className={`call-hud-role-badge ${
                  transcriptRole === "assistant"
                    ? "role-assistant"
                    : transcriptRole === "user"
                    ? "role-user"
                    : "role-system"
                }`}
              >
                {transcriptRole === "assistant"
                  ? "MECHA-IR01"
                  : transcriptRole === "user"
                  ? "VISITOR"
                  : "SYSTEM"}
              </span>
              <span style={{ fontSize: "10px", color: "var(--paper-muted)", fontFamily: "var(--mono)" }}>
                REALTIME AUDIO TRANSCRIPTION
              </span>
            </div>
            <p className="call-hud-caption-text">
              &ldquo;{currentCaption}&rdquo;
            </p>
            {errorMessage && (
              <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--accent)" }}>
                Notice: {errorMessage}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* QUICK TOPIC PROMPTS */}
      <section className="call-hud-chips-bar">
        <span className="call-hud-chips-label">SUGGESTED TOPICS:</span>
        {topicChips.map((chip) => (
          <button
            key={chip}
            onClick={() => sendPromptToAssistant(chip)}
            className="call-hud-topic-chip"
          >
            + {chip}
          </button>
        ))}
      </section>

      {/* BOTTOM CONTROLS DOCK */}
      <footer className="call-hud-bottombar">
        <div className="call-hud-controls-left">
          <button
            onClick={toggleMute}
            className={`call-hud-action-btn ${isMuted ? "btn-active" : ""}`}
            style={{ padding: "8px 16px" }}
          >
            <span>{isMuted ? "🔇 UNMUTE MIC" : "🎙️ MUTE MIC"}</span>
          </button>

          <button
            onClick={toggleCamera}
            className={`call-hud-action-btn ${isCameraOn ? "btn-active" : ""}`}
            style={{ padding: "8px 16px" }}
          >
            <span>{isCameraOn ? "📹 DISABLE CAM" : "📷 ENABLE CAM"}</span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={endCall}
            className="call-hud-action-btn btn-danger"
            style={{ padding: "8px 20px" }}
          >
            LEAVE CALL & EXPLORE SITE →
          </button>
        </div>
      </footer>
    </div>
  );
}
