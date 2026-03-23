import React from "react";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const BulletPoint: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
    <div
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: theme.colors.accent,
        marginTop: "10px",
        flexShrink: 0,
      }}
    />
    <span style={{ fontSize: "18px", color: theme.colors.textSecondary, lineHeight: 1.6 }}>
      {text}
    </span>
  </div>
);

export const Slide2Challenge: React.FC = () => {
  return (
    <SlideLayout slideNumber={2} totalSlides={7}>
      <h2
        style={{
          fontSize: "42px",
          fontWeight: 700,
          margin: 0,
          background: theme.colors.gradient3,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        The Challenge
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: theme.colors.textMuted,
          margin: "8px 0 36px",
          fontStyle: "italic",
        }}
      >
        $100M TVL. Long-term allocators. Not mercenary capital.
      </p>

      <div style={{ display: "flex", gap: "40px", flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "rgba(220,38,38,0.04)",
              border: "1px solid rgba(220,38,38,0.15)",
              borderRadius: "16px",
              padding: "32px",
              height: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: theme.colors.accentRed,
                margin: "0 0 24px",
              }}
            >
              The Problem
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <BulletPoint text="Most DeFi yield is unsustainable" />
              <BulletPoint text="Mercenary capital chases APY" />
              <BulletPoint text="Communities disappear after TGE" />
              <BulletPoint text="Airdrop hunters, not allocators" />
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "rgba(8,145,178,0.04)",
              border: "1px solid rgba(8,145,178,0.15)",
              borderRadius: "16px",
              padding: "32px",
              height: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: theme.colors.accent,
                margin: "0 0 24px",
              }}
            >
              The Goal
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <BulletPoint text="First 100 quality investors" />
              <BulletPoint text="Pre-token → long-term allocators" />
              <BulletPoint text="Community that sticks post-launch" />
              <BulletPoint text="Sustainable, trust-based growth" />
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
