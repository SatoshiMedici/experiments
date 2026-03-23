import React from "react";
import { SlideLayout } from "../components/SlideLayout";
import { theme } from "../theme";

export const Slide1Title: React.FC = () => {
  return (
    <SlideLayout slideNumber={1} totalSlides={7}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "36px",
        }}
      >
        <h1
          style={{
            fontSize: "96px",
            fontWeight: 800,
            letterSpacing: "10px",
            background: theme.colors.gradient3,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          MULTYR
        </h1>

        <div
          style={{
            width: "100px",
            height: "3px",
            background: theme.colors.gradient3,
            borderRadius: "2px",
          }}
        />

        <h2
          style={{
            fontSize: "30px",
            fontWeight: 300,
            color: theme.colors.textSecondary,
            letterSpacing: "4px",
            textTransform: "uppercase",
            margin: 0,
            textAlign: "center",
          }}
        >
          Growth & Community Lead Challenge
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            marginTop: "24px",
          }}
        >
          <p
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: theme.colors.text,
              margin: 0,
            }}
          >
            Mario Vasconcelos
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <span
              style={{
                fontSize: "14px",
                color: theme.colors.accent,
                padding: "6px 18px",
                border: `1.5px solid ${theme.colors.accent}`,
                borderRadius: "24px",
                fontWeight: 500,
              }}
            >
              AI-First Marketing & BD
            </span>
            <span
              style={{
                fontSize: "14px",
                color: theme.colors.primary,
                padding: "6px 18px",
                border: `1.5px solid ${theme.colors.primaryLight}`,
                borderRadius: "24px",
                fontWeight: 500,
              }}
            >
              7+ Years Web3
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: theme.colors.textMuted,
            margin: 0,
            marginTop: "8px",
          }}
        >
          March 2026
        </p>
      </div>
    </SlideLayout>
  );
};
