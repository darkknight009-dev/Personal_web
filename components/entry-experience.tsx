"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";

interface EntryExperienceProps {
  onSelectExploreSolo: () => void;
  onSelectAICall: () => void;
}

export default function EntryExperience({
  onSelectExploreSolo,
  onSelectAICall,
}: EntryExperienceProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  useEffect(() => {
    // Check if user previously chose to bypass modal
    const hasSeenModal = localStorage.getItem("ir_has_selected_mode");
    if (hasSeenModal === "solo") {
      setIsVisible(false);
      onSelectExploreSolo();
      return;
    }

    // GSAP Entrance animation
    gsap.fromTo(
      ".entry-card",
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.16, ease: "power3.out" }
    );
    gsap.fromTo(
      ".entry-anim-item",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power2.out" }
    );
  }, [onSelectExploreSolo]);

  const handleChooseSolo = (remember: boolean = false) => {
    if (remember) {
      localStorage.setItem("ir_has_selected_mode", "solo");
    }
    setIsDismissing(true);
    gsap.to(".entry-modal-backdrop", {
      opacity: 0,
      y: -24,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setIsVisible(false);
        onSelectExploreSolo();
      },
    });
  };

  const handleChooseAICall = () => {
    setIsDismissing(true);
    gsap.to(".entry-modal-backdrop", {
      opacity: 0,
      scale: 0.98,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        setIsVisible(false);
        onSelectAICall();
      },
    });
  };

  if (!isVisible) return null;

  return (
    <div
      className="entry-modal-backdrop"
      style={{
        pointerEvents: isDismissing ? "none" : "auto",
        transition: "opacity 0.3s ease",
      }}
    >
      {/* SOLID EDITORIAL ARCHITECTURAL CORNER MARKS */}
      <span className="entry-corner-mark entry-corner-tl">+ IR // 2026</span>
      <span className="entry-corner-mark entry-corner-tr">TERMINAL // READY +</span>
      <span className="entry-corner-mark entry-corner-bl">+ CHITKARA / PROGRAMMING.COM</span>
      <span className="entry-corner-mark entry-corner-br">SELECT_EXPERIENCE +</span>

      {/* TOP HEADER */}
      <header className="entry-header-wrap">
        <div className="entry-anim-item entry-system-badge">
          <span className="pulse-dot" />
          <span>ISHAAN RAI — PORTFOLIO PROTOCOL</span>
        </div>

        <h1 className="entry-anim-item entry-main-title">
          Choose your <em>experience</em>.
        </h1>

        <p className="entry-anim-item entry-intro-copy">
          Explore the curated engineering archive on your own, or initiate a real-time voice & video
          dialogue with Ishaan&apos;s autonomous AI persona.
        </p>
      </header>

      {/* TWO DISTINCT EDITORIAL SELECTION CARDS */}
      <main className="entry-cards-grid">
        {/* OPTION 01: BROWSE SOLO */}
        <article
          onClick={() => handleChooseSolo(false)}
          className="entry-card entry-card-solo"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleChooseSolo(false)}
        >
          <div>
            <div className="entry-card-topline">
              <span>[ MODE // 01 ]</span>
              <span>SOLO EXPLORATION</span>
            </div>

            <h2 className="entry-card-heading">
              Explore Website by Yourself
            </h2>

            <p className="entry-card-desc">
              Browse the curated editorial portfolio with smooth inertia scrolling. Inspect all 6 deep-dive
              project case studies, review technical architectural decisions, and verify live demos at your own pace.
            </p>

            <div className="entry-tags-row">
              <span className="entry-tag-item">6 Case Studies</span>
              <span className="entry-tag-item">Interactive Timeline</span>
              <span className="entry-tag-item">Lenis Smooth Scroll</span>
            </div>
          </div>

          <div className="entry-card-footer">
            <span className="entry-action-link">
              ENTER ARCHIVE DIRECTLY →
            </span>
            <span style={{ color: "var(--paper-muted)", fontSize: "11px" }}>
              [ ESC ]
            </span>
          </div>
        </article>

        {/* OPTION 02: LIVE AI VOICE & VIDEO CALL */}
        <article
          onClick={handleChooseAICall}
          className="entry-card entry-card-ai"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleChooseAICall()}
        >
          <div>
            <div className="entry-card-topline">
              <span style={{ color: "var(--accent)" }}>[ MODE // 02 ]</span>
              <span className="status-live">
                LIVE AI VOICE & VIDEO
              </span>
            </div>

            <h2 className="entry-card-heading">
              Call Ishaan&apos;s AI Twin
            </h2>

            <p className="entry-card-desc">
              Initiate a live two-way voice & video conversation with Ishaan&apos;s autonomous AI Persona.
              Features an interactive audio-reactive mecha robot that tracks your cursor, speaks in real-time,
              and explains technical architecture live.
            </p>

            <div className="entry-tags-row">
              <span className="entry-tag-item highlight">Vapi AI WebRTC</span>
              <span className="entry-tag-item highlight">Audio-Reactive Mecha Avatar</span>
              <span className="entry-tag-item highlight">Webcam PIP</span>
            </div>
          </div>

          <div className="entry-card-footer">
            <span className="entry-action-link">
              COMMENCE AI CALL ↗
            </span>
            <span className="entry-pill-badge">
              RECOMMENDED
            </span>
          </div>
        </article>
      </main>

      {/* FOOTER BAR */}
      <footer className="entry-modal-footer">
        <p style={{ margin: 0 }}>Built with Next.js 16 · Vapi AI · GSAP · Lenis</p>
        <div>
          <button
            onClick={() => handleChooseSolo(true)}
            className="entry-bypass-btn"
          >
            Always skip this entry screen
          </button>
        </div>
      </footer>
    </div>
  );
}
