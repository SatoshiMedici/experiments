import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const SignalItem: React.FC<{
  text: string;
  isGood: boolean;
  delay: number;
}> = ({ text, isGood, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(progress, [0, 1], [isGood ? -15 : 15, 0])}px)`,
      }}
    >
      <span
        style={{
          fontSize: "18px",
          color: isGood ? theme.colors.accentGreen : theme.colors.accentRed,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {isGood ? "\u2713" : "\u2717"}
      </span>
      <span
        style={{
          fontSize: "17px",
          color: theme.colors.textSecondary,
          lineHeight: 1.5,
        }}
      >
        {text}
      </span>
    </div>
  );
};

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
      <AnimatedElement delay={0}>
        <h2
          style={{
            fontSize: "48px",
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
      </AnimatedElement>
      <AnimatedElement delay={5}>
        <p
          style={{
            fontSize: "20px",
            color: theme.colors.textMuted,
            margin: "8px 0 36px",
            fontStyle: "italic",
          }}
        >
          How to filter airdrop hunters from real allocators
        </p>
      </AnimatedElement>

      <div style={{ display: "flex", gap: "30px", flex: 1 }}>
        {/* Good signals */}
        <div style={{ flex: 1 }}>
          <AnimatedElement delay={8}>
            <div
              style={{
                background: "rgba(0,184,148,0.06)",
                border: "1px solid rgba(0,184,148,0.2)",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: theme.colors.accentGreen,
                  margin: "0 0 20px",
                }}
              >
                High-Value Signals
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {goodSignals.map((s, i) => (
                  <SignalItem
                    key={i}
                    text={s}
                    isGood={true}
                    delay={12 + i * 5}
                  />
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Bad signals */}
        <div style={{ flex: 1 }}>
          <AnimatedElement delay={12}>
            <div
              style={{
                background: "rgba(255,107,107,0.06)",
                border: "1px solid rgba(255,107,107,0.2)",
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: theme.colors.accentRed,
                  margin: "0 0 20px",
                }}
              >
                Low-Value Signals
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {badSignals.map((s, i) => (
                  <SignalItem
                    key={i}
                    text={s}
                    isGood={false}
                    delay={16 + i * 5}
                  />
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Filtering methods */}
        <div style={{ flex: 0.8 }}>
          <AnimatedElement delay={35}>
            <div
              style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: "16px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: theme.colors.primaryLight,
                  margin: "0 0 20px",
                }}
              >
                Filtering Methods
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {filterMethods.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: `${theme.colors.primary}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: theme.colors.primaryLight,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      style={{
                        fontSize: "15px",
                        color: theme.colors.textSecondary,
                        lineHeight: 1.4,
                      }}
                    >
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </SlideLayout>
  );
};
