"use client";

import React, { useState, useEffect } from "react";
import EntryExperience from "./entry-experience";
import AICallInterface from "./ai-call-interface";

export default function PortfolioAIController() {
  const [showEntryModal, setShowEntryModal] = useState<boolean>(true);
  const [showCallInterface, setShowCallInterface] = useState<boolean>(false);

  useEffect(() => {
    // Listen for custom trigger from any button across the page
    const handleOpenCall = () => {
      setShowCallInterface(true);
      setShowEntryModal(false);
    };

    window.addEventListener("open-ai-call", handleOpenCall);
    return () => window.removeEventListener("open-ai-call", handleOpenCall);
  }, []);

  // Lock body scroll while initial entry modal is visible
  useEffect(() => {
    if (showEntryModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEntryModal]);

  const handleSelectExploreSolo = () => {
    setShowEntryModal(false);
  };

  const handleSelectAICall = () => {
    setShowEntryModal(false);
    setShowCallInterface(true);
  };

  return (
    <>
      {/* 1. INITIAL ENTRY OVERLAY */}
      {showEntryModal && (
        <EntryExperience
          onSelectExploreSolo={handleSelectExploreSolo}
          onSelectAICall={handleSelectAICall}
        />
      )}

      {/* 2. LIVE VAPI AI CALL INTERFACE */}
      <AICallInterface
        isOpen={showCallInterface}
        onClose={() => setShowCallInterface(false)}
      />

      {/* 3. PERSISTENT FLOATING TRIGGER ON PORTFOLIO */}
      {!showEntryModal && !showCallInterface && (
        <aside className="persistent-ai-trigger" aria-label="Quick launch AI assistant">
          <button
            onClick={() => setShowCallInterface(true)}
            className="persistent-ai-btn"
          >
            <span className="beacon" />
            <span style={{ fontWeight: 600 }}>TALK WITH AI TWIN</span>
            <span style={{ color: "var(--accent)" }}>↗</span>
          </button>
        </aside>
      )}
    </>
  );
}
