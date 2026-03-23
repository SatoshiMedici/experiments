import React, { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./theme";

import { Slide1Title } from "./slides/Slide1Title";
import { Slide2Challenge } from "./slides/Slide2Challenge";
import { Slide3First100 } from "./slides/Slide3First100";
import { Slide4Funnel } from "./slides/Slide4Funnel";
import { Slide5Content } from "./slides/Slide5Content";
import { Slide6Quality } from "./slides/Slide6Quality";
import { Slide7Budget } from "./slides/Slide7Budget";

const TOTAL_SLIDES = 7;

const slides = [
  Slide1Title,
  Slide2Challenge,
  Slide3First100,
  Slide4Funnel,
  Slide5Content,
  Slide6Quality,
  Slide7Budget,
];

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, TOTAL_SLIDES - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const SlideComponent = slides[current];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: theme.colors.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: theme.fonts.body,
        overflow: "hidden",
      }}
    >
      {/* Slide content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, display: "flex" }}>
          <SlideComponent />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          background: "white",
          borderTop: `1px solid ${theme.colors.border}`,
        }}
      >
        <button
          onClick={goPrev}
          disabled={current === 0}
          style={{
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: 600,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "8px",
            background: "white",
            color: current === 0 ? theme.colors.textMuted : theme.colors.text,
            cursor: current === 0 ? "default" : "pointer",
            opacity: current === 0 ? 0.5 : 1,
            fontFamily: theme.fonts.body,
          }}
        >
          Previous
        </button>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "32px" : "10px",
                height: "10px",
                borderRadius: "5px",
                border: "none",
                background: i === current ? theme.colors.primary : "#ddd",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: "12px",
              fontSize: "13px",
              color: theme.colors.textMuted,
              fontWeight: 500,
            }}
          >
            {current + 1} / {TOTAL_SLIDES}
          </span>
        </div>

        <button
          onClick={goNext}
          disabled={current === TOTAL_SLIDES - 1}
          style={{
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            borderRadius: "8px",
            background:
              current === TOTAL_SLIDES - 1 ? "#ddd" : theme.colors.primary,
            color: "white",
            cursor: current === TOTAL_SLIDES - 1 ? "default" : "pointer",
            opacity: current === TOTAL_SLIDES - 1 ? 0.5 : 1,
            fontFamily: theme.fonts.body,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
