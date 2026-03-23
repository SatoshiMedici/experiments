import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const budgetItems = [
  { category: "KOL Partnerships", amount: "$4,000", pct: 40, desc: "2-3 mid-tier CT influencers with engaged DeFi audiences", color: "#6c5ce7" },
  { category: "Community Incentives", amount: "$2,000", pct: 20, desc: "Rewards for quality contributions — feedback, referrals", color: "#00cec9" },
  { category: "Content Production", amount: "$1,500", pct: 15, desc: "Design assets, thread graphics, explainer visuals", color: "#00b894" },
  { category: "Twitter Spaces/AMAs", amount: "$1,000", pct: 10, desc: "Co-host with aligned protocols", color: "#a29bfe" },
  { category: "Tools & Ops", amount: "$1,000", pct: 10, desc: "Analytics, CRM, outreach tools", color: "#fdcb6e" },
  { category: "Reserve", amount: "$500", pct: 5, desc: "Opportunistic spend", color: "#636e72" },
];

const wontSpend = [
  { label: "Paid ads", reason: "wrong audience for DeFi" },
  { label: "Mass giveaways", reason: "attracts farmers, not allocators" },
  { label: "Big influencers", reason: "expensive, low trust, mercenary" },
];

export const Slide7Budget: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SlideLayout slideNumber={7} totalSlides={7}>
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
          $10K Budget Allocation
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
          Maximize signal, minimize noise.
        </p>
      </AnimatedElement>

      <div style={{ display: "flex", gap: "40px", flex: 1 }}>
        {/* Budget bars */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "14px" }}>
          {budgetItems.map((item, i) => {
            const barProgress = spring({
              frame: frame - 10 - i * 6,
              fps,
              config: { damping: 20 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(barProgress, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: theme.colors.text,
                      }}
                    >
                      {item.category}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: theme.colors.textMuted,
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: item.color,
                      }}
                    >
                      {item.amount}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: theme.colors.textMuted,
                        width: "36px",
                        textAlign: "right",
                      }}
                    >
                      {item.pct}%
                    </span>
                  </div>
                </div>
                {/* Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${item.pct * interpolate(barProgress, [0, 1], [0, 1])}%`,
                      height: "100%",
                      background: item.color,
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Won't Spend */}
        <AnimatedElement delay={50} style={{ width: "320px", flexShrink: 0 }}>
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
              Won't Spend On
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {wontSpend.map((item, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: theme.colors.accentRed,
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      {"\u2717"}
                    </span>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: theme.colors.text,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: theme.colors.textMuted,
                      margin: "4px 0 0 26px",
                    }}
                  >
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>
    </SlideLayout>
  );
};
