"use client";

import React, { useState } from "react";

interface Track {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  bpm: number;
  search: string;
}

const PLAYLIST: Track[] = [
  {
    id: "01",
    title: "Soft chaos, good lyrics",
    subtitle: "Hindi · English · Punjabi romance and pop",
    genre: "LOFI / ROMANCE",
    bpm: 88,
    search: "Hindi English Punjabi romantic pop songs",
  },
  {
    id: "02",
    title: "Kinni Kinni (Late Night Tape)",
    subtitle: "Diljit Dosanjh · Chill Acoustic Beats",
    genre: "PUNJABI CHILL",
    bpm: 96,
    search: "Kinni Kinni Diljit Dosanjh",
  },
  {
    id: "03",
    title: "Starboy & Midnight City",
    subtitle: "The Weeknd · M83 · Synthwave Flow",
    genre: "SYNTH POP",
    bpm: 118,
    search: "Starboy The Weeknd Midnight City M83",
  },
];

export default function InteractiveSignalSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  // 3D Tilt state for Card 1
  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });
  const [tilt3, setTilt3] = useState({ x: 0, y: 0 });

  const currentTrack = PLAYLIST[currentTrackIndex];

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const musicSearchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(currentTrack.search)}`;

  // Mouse tilt helper
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, setTilt: (t: { x: number; y: number }) => void) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const resetTilt = (setTilt: (t: { x: number; y: number }) => void) => {
    setTilt({ x: 0, y: 0 });
  };

  const tools = [
    { num: "01", name: "RAG agents", tag: "FAISS · Hybrid Search · Re-Ranking", status: "PRODUCTION" },
    { num: "02", name: "AI workflows", tag: "LangChain · Multi-Agent · Vapi", status: "AUTONOMOUS" },
    { num: "03", name: "APIs & backends", tag: "Next.js · Node · Docker · FastAPI", status: "HIGH SPEED" },
    { num: "04", name: "Hackathon builds", tag: "15+ Builds · Microsoft Top Finishes", status: "SHIP VELOCITY" },
  ];

  return (
    <section className="signal-section section-shell" aria-label="Current signals and moodboard">
      {/* SECTION HEADER BADGE */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          padding: "0 6px",
          fontFamily: "var(--mono)",
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "rgba(235, 231, 220, 0.45)",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#cf6e4a",
              boxShadow: "0 0 8px #cf6e4a",
              animation: "pulse 2s infinite",
            }}
          />
          <span>SIGNAL MATRIX // TELEMETRY & MOODBOARD</span>
        </div>
        <span>LIVE SENSORS 3/3 ONLINE</span>
      </div>

      <div className="signal-grid reveal-up">
        {/* CARD 1: CURRENTLY TRACKING (WARM TERRACOTTA CYBER-RADAR) */}
        <div
          className="signal-card signal-card-large"
          onMouseMove={(e) => handleTilt(e, setTilt1)}
          onMouseLeave={() => resetTilt(setTilt1)}
          style={{
            transform: `perspective(1000px) rotateX(${tilt1.y}deg) rotateY(${tilt1.x}deg)`,
            transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
            position: "relative",
            overflow: "hidden",
            boxShadow: tilt1.x !== 0 ? "0 20px 40px rgba(207, 110, 74, 0.35)" : "none",
          }}
        >
          {/* Cyber Radar Grid Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(17, 17, 15, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 17, 15, 0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />

          {/* Animated Radar Sweep Line */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(255, 255, 255, 0.12) 35deg, transparent 36deg)",
              animation: "spin 9s linear infinite",
              pointerEvents: "none",
              borderRadius: "50%",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow" style={{ fontWeight: 600, letterSpacing: "0.15em" }}>
                [ 01 // CURRENTLY TRACKING ]
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "var(--mono)",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  background: "rgba(17, 17, 15, 0.15)",
                  color: "var(--ink)",
                  letterSpacing: "0.08em",
                }}
              >
                RADAR: ACTIVE
              </span>
            </div>

            <div className="signal-title-row">
              <h2 style={{ letterSpacing: "-0.02em" }}>
                What's
                <br />
                <em>next?</em>
              </h2>
              <div
                className="signal-arrow"
                style={{
                  background: "rgba(17, 17, 15, 0.08)",
                  backdropFilter: "blur(6px)",
                  transition: "all 0.3s ease",
                }}
              >
                ↗
              </div>
            </div>

            <p style={{ fontWeight: 500 }}>
              Emerging AI tools, intelligent autonomous workflows, and practical products that solve real problems.
            </p>

            <div className="active-nodes" aria-label="AI tools I am exploring">
              <span>EXPLORING</span>
              <b>Gemini</b><i /> <b>Claude</b><i /> <b>OpenAI</b>
            </div>

            {/* Telemetry Lines */}
            <div className="signal-lines" aria-hidden="true" style={{ bottom: "24px" }}>
              <span style={{ background: "rgba(17, 17, 15, 0.6)" }} />
              <span style={{ background: "rgba(17, 17, 15, 0.4)" }} />
              <span style={{ background: "rgba(17, 17, 15, 0.25)" }} />
            </div>
          </div>
        </div>

        {/* CARD 2: MUSIC MOODBOARD */}
        <div
          className="signal-card signal-card-music"
          onMouseMove={(e) => handleTilt(e, setTilt2)}
          onMouseLeave={() => resetTilt(setTilt2)}
          style={{
            transform: `perspective(1000px) rotateX(${tilt2.y}deg) rotateY(${tilt2.x}deg)`,
            transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
            position: "relative",
            overflow: "hidden",
            boxShadow: tilt2.x !== 0 ? "0 20px 40px rgba(0, 0, 0, 0.2)" : "none",
          }}
        >
          {/* Card Header with Track Selector */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="eyebrow" style={{ letterSpacing: "0.15em" }}>
              [ 02 // MOODBOARD ]
            </span>
            <button
              onClick={nextTrack}
              title="Next Track"
              style={{
                background: "transparent",
                border: "1px solid rgba(17, 17, 15, 0.18)",
                borderRadius: "12px",
                padding: "2px 8px",
                fontSize: "9px",
                fontFamily: "var(--mono)",
                cursor: "pointer",
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              SKIP »
            </button>
          </div>

          {/* Vinyl-style link to the selected YouTube Music search */}
          <a
            href={musicSearchUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Search YouTube Music for ${currentTrack.title}`}
            style={{
              display: "block",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              position: "relative",
              width: "148px",
              height: "148px",
              margin: "24px auto 14px",
            }}
          >
            {/* Spinning Disc */}
            <div
              className={`record-art${isPlaying ? " is-playing" : ""}`}
              style={{
                margin: 0,
                width: "100%",
                height: "100%",
                boxShadow: "0 8px 18px rgba(0, 0, 0, 0.15)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div className="record-ring ring-a" />
              <div className="record-ring ring-b" />
              {/* Vinyl Groove Sheen Reflection */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 40%, rgba(255,255,255,0.15) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div className="record-center" style={{ fontWeight: 600 }}>
                ▶
              </div>
            </div>

            {/* Tonearm Arm */}
            <div
              style={{
                position: "absolute",
                top: "-12px",
                right: "-8px",
                width: "36px",
                height: "70px",
                borderRight: "3px solid #111",
                borderTop: "3px solid #111",
                borderRadius: "0 10px 0 0",
                transformOrigin: "top right",
                transform: "rotate(0deg)",
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  right: "-5px",
                  width: "12px",
                  height: "7px",
                  background: "#cf6e4a",
                  borderRadius: "2px",
                }}
              />
            </div>
          </a>

          {/* Music Copy */}
          <div className="music-copy">
            <strong style={{ fontSize: "20px" }}>{isPlaying ? "Work Of Art" : currentTrack.title}</strong>
            <span style={{ fontSize: "9px" }}>{isPlaying ? "NOW PLAYING · YOUTUBE" : currentTrack.subtitle}</span>
          </div>

          {/* Play the selected track in the embedded YouTube player */}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              type="button"
              onClick={() => setIsPlaying((playing) => !playing)}
              className="music-listen-link"
            >
              {isPlaying ? "STOP PLAYBACK" : "PLAY WORK OF ART"}
            </button>
          </div>

          {isPlaying && (
            <div className="music-player-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/mHumBHbmLfM?autoplay=1&rel=0&list=RDmHumBHbmLfM"
                title="Work Of Art"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          )}

          {/* Decorative waveform */}
          <div className={`waveform${isPlaying ? " is-playing" : ""}`} aria-hidden="true" style={{ bottom: "18px" }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                style={{
                  height: isPlaying ? `${8 + (i % 5) * 2}px` : "7px",
                  animation: isPlaying
                    ? `audioWave 0.75s ease-in-out infinite alternate ${i * 0.04}s`
                    : "none",
                  transition: "height 0.2s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* CARD 3: TOOLS I KEEP CLOSE */}
        <div
          className="signal-card signal-card-tools"
          onMouseMove={(e) => handleTilt(e, setTilt3)}
          onMouseLeave={() => resetTilt(setTilt3)}
          style={{
            transform: `perspective(1000px) rotateX(${tilt3.y}deg) rotateY(${tilt3.x}deg)`,
            transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
            position: "relative",
            overflow: "hidden",
            boxShadow: tilt3.x !== 0 ? "0 20px 40px rgba(0, 0, 0, 0.3)" : "none",
          }}
        >
          {/* Subtle Grid overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(235, 231, 220, 0.08) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow" style={{ color: "rgba(235, 231, 220, 0.65)", letterSpacing: "0.15em" }}>
                [ 03 // WEAPONS OF CHOICE ]
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "var(--mono)",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  background: "rgba(235, 231, 220, 0.12)",
                  color: "var(--paper)",
                }}
              >
                PROD GRADE
              </span>
            </div>

            {/* Interactive Tool Rows */}
            <div className="tool-list" style={{ marginTop: "42px", gap: "10px" }}>
              {tools.map((tool, idx) => (
                <div
                  key={tool.num}
                  onMouseEnter={() => setHoveredTool(idx)}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: hoveredTool === idx ? "rgba(235, 231, 220, 0.14)" : "rgba(235, 231, 220, 0.04)",
                    border: hoveredTool === idx ? "1px solid rgba(235, 231, 220, 0.35)" : "1px solid rgba(235, 231, 220, 0.1)",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ border: 0, padding: 0, margin: 0, fontSize: "13px" }}>
                      <span style={{ color: "rgba(235, 231, 220, 0.5)", marginRight: "8px", fontSize: "11px", fontFamily: "var(--mono)" }}>
                        {tool.num}
                      </span>
                      <b style={{ color: hoveredTool === idx ? "#ff9e79" : "var(--paper)" }}>
                        {tool.name}
                      </b>
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "var(--mono)",
                        color: hoveredTool === idx ? "#cf6e4a" : "rgba(235, 231, 220, 0.4)",
                        letterSpacing: "0.08em",
                        border: 0,
                        padding: 0,
                      }}
                    >
                      {tool.status}
                    </span>
                  </div>
                  {hoveredTool === idx && (
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "10px",
                        fontFamily: "var(--mono)",
                        color: "rgba(235, 231, 220, 0.75)",
                        animation: "fadeIn 0.2s ease",
                      }}
                    >
                      → {tool.tag}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              className="tools-note"
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "12px",
                borderTop: "1px solid rgba(235, 231, 220, 0.15)",
              }}
            >
              <span className="tools-note-label">IN THE TOOLKIT</span>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  color: "rgba(235, 231, 220, 0.75)",
                  maxWidth: "150px",
                  lineHeight: "1.2",
                  textAlign: "right",
                }}
              >
                Always one hackathon away from a new obsession.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
