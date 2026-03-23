import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const funnelStages = [
  {
    stage: "Awareness",
    desc: "CT content, threads, protocol partnerships",
    width: "100%",
    color: "#6c5ce7",
  },
  {
    stage: "Education",
    desc: "Clear explainers on strategies, risk, returns",
    width: "85%",
    color: "#7c6df7",
  },
  {
    stage: "Commitment",
    desc: "Points tied to meaningful actions, not tasks",
    width: "68%",
    color: "#00cec9",
  },
  {
    stage: "Ownership",
    desc: "Governance weight, advisory input, fee discounts",
    width: "50%",
    color: "#00b894",
  },
  {
    stage: "Retention",
    desc: "Loyalty tiers, boosted yields, transparent reporting",
    width: "35%",
    color: "#00d2d3",
  },
];

export const Slide4Funnel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SlideLayout slideNumber={4} totalSlides={7}>
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
          The Funnel
        </h2>
      </AnimatedElement>
      <AnimatedElement delay={5}>
        <p
          style={{
            fontSize: "20px",
            color: theme.colors.textMuted,
            margin: "8px 0 40px",
            fontStyle: "italic",
          }}
        >
          The funnel doesn't end at token. It starts there.
        </p>
      </AnimatedElement>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        {/* Funnel visual */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {funnelStages.map((s, i) => {
            const progress = spring({
              frame: frame - 10 - i * 8,
              fps,
              config: { damping: 18 },
            });
            return (
              <div
                key={i}
                style={{
                  width: s.width,
                  opacity: interpolate(progress, [0, 1], [0, 1]),
                  transform: `scaleX(${interpolate(progress, [0, 1], [0.5, 1])})`,
                }}
              >
                <div
                  style={{
                    background: `${s.color}22`,
                    border: `1px solid ${s.color}44`,
                    borderRadius: "12px",
                    padding: "18px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: s.color,
                      minWidth: "120px",
                    }}
                  >
                    {s.stage}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {s.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Insight */}
        <AnimatedElement delay={50} style={{ width: "380px", flexShrink: 0 }}>
          <div
            style={{
              background: "rgba(108,92,231,0.1)",
              border: "1px solid rgba(108,92,231,0.25)",
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: theme.colors.primaryLight,
                margin: "0 0 16px",
              }}
            >
              Key Insight
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: theme.colors.textSecondary,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Filter for intent early. People who engage with education and
              provide feedback are more likely to allocate capital than people
              who just complete tasks.
            </p>
          </div>
        </AnimatedElement>
      </div>
    </SlideLayout>
  );
};
