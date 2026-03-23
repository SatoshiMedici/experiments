import React from "react";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const SignalItem: React.FC<{ text: string; isGood: boolean }> = ({ text, isGood }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
    <span
      style={{
        fontSize: "16px",
        color: isGood ? theme.colors.accentGreen : theme.colors.accentRed,
        fontWeight: 700,
        flexShrink: 0,
        marginTop: "1px",
      }}
    >
      {isGood ? "\u2713" : "\u2717"}
    </span>
    <span style={{ fontSize: "15px", color: theme.colors.textSecondary, lineHeight: 1.5 }}>
      {text}
    </span>
  </div>
);

export const Slide6Quality: React.FC = () => {
  const goodSignals = [
    "Engage with educational content",
    "Ask substantive questions",
    "On-chain history: LP positions, governance",
    "Provide feedback or criticism",
    "Referred by trusted sources",
  ];

  const badSignals = [
    "Only interact with giveaway posts",
    'Generic comments ("LFG", "wen token")',
    "Wallet full of airdrop farming",
    "Zero engagement after completing tasks",
    "No meaningful on-chain activity",
  ];

  const filterMethods = [
    "Quality-weighted points system",
    "Minimum engagement over time",
    "On-chain scoring (Gitcoin Passport, Galxe)",
    "Manual review for top tier",
  ];

  return (
    <SlideLayout slideNumber={6} totalSlides={7}>
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
        Quality vs Quantity
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: theme.colors.textMuted,
          margin: "8px 0 32px",
          fontStyle: "italic",
        }}
      >
        How to filter airdrop hunters from real allocators
      </p>

      <div style={{ display: "flex", gap: "24px", flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "rgba(5,150,105,0.04)",
              border: "1px solid rgba(5,150,105,0.15)",
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: theme.colors.accentGreen,
                margin: "0 0 20px",
              }}
            >
              High-Value Signals
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {goodSignals.map((s, i) => (
                <SignalItem key={i} text={s} isGood={true} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              background: "rgba(220,38,38,0.04)",
              border: "1px solid rgba(220,38,38,0.15)",
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: theme.colors.accentRed,
                margin: "0 0 20px",
              }}
            >
              Low-Value Signals
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {badSignals.map((s, i) => (
                <SignalItem key={i} text={s} isGood={false} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 0.8 }}>
          <div
            style={{
              background: "white",
              border: `1px solid ${theme.colors.border}`,
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: theme.colors.primary,
                margin: "0 0 20px",
              }}
            >
              Filtering Methods
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {filterMethods.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: `${theme.colors.primary}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: theme.colors.primary,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span style={{ fontSize: "14px", color: theme.colors.textSecondary, lineHeight: 1.4 }}>
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
