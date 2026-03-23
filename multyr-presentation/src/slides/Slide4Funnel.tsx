import React from "react";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const funnelStages = [
  { stage: "Awareness", desc: "CT content, threads, protocol partnerships", width: "100%", color: "#4f46e5" },
  { stage: "Education", desc: "Clear explainers on strategies, risk, returns", width: "85%", color: "#6366f1" },
  { stage: "Commitment", desc: "Points tied to meaningful actions, not tasks", width: "68%", color: "#0891b2" },
  { stage: "Ownership", desc: "Governance weight, advisory input, fee discounts", width: "50%", color: "#059669" },
  { stage: "Retention", desc: "Loyalty tiers, boosted yields, transparent reporting", width: "35%", color: "#0d9488" },
];

export const Slide4Funnel: React.FC = () => {
  return (
    <SlideLayout slideNumber={4} totalSlides={7}>
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
        The Funnel
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: theme.colors.textMuted,
          margin: "8px 0 36px",
          fontStyle: "italic",
        }}
      >
        The funnel doesn't end at token. It starts there.
      </p>

      <div style={{ display: "flex", gap: "40px", flex: 1, alignItems: "flex-start" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          {funnelStages.map((s, i) => (
            <div key={i} style={{ width: s.width }}>
              <div
                style={{
                  background: `${s.color}0a`,
                  border: `1px solid ${s.color}25`,
                  borderRadius: "12px",
                  padding: "16px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "17px", fontWeight: 600, color: s.color, minWidth: "110px" }}>
                  {s.stage}
                </span>
                <span style={{ fontSize: "14px", color: theme.colors.textSecondary }}>
                  {s.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <AnimatedElement style={{ width: "360px", flexShrink: 0 }}>
          <div
            style={{
              background: "rgba(79,70,229,0.04)",
              border: "1px solid rgba(79,70,229,0.15)",
              borderRadius: "16px",
              padding: "28px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: theme.colors.primary,
                margin: "0 0 16px",
              }}
            >
              Key Insight
            </h3>
            <p
              style={{
                fontSize: "15px",
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
