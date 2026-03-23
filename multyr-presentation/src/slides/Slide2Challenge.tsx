import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const BulletPoint: React.FC<{ text: string; delay: number }> = ({
  text,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 20 } });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(progress, [0, 1], [-20, 0])}px)`,
      }}
    >
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
      <span style={{ fontSize: "20px", color: theme.colors.textSecondary, lineHeight: 1.5 }}>
        {text}
      </span>
    </div>
  );
};

export const Slide2Challenge: React.FC = () => {
  return (
    <SlideLayout slideNumber={2} totalSlides={7}>
      {/* Header */}
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
          The Challenge
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
          $100M TVL. Long-term allocators. Not mercenary capital.
        </p>
      </AnimatedElement>

      {/* Two columns */}
      <div style={{ display: "flex", gap: "60px", flex: 1 }}>
        {/* The Problem */}
        <div style={{ flex: 1 }}>
          <AnimatedElement delay={10}>
            <div
              style={{
                background: "rgba(255,107,107,0.08)",
                border: "1px solid rgba(255,107,107,0.2)",
                borderRadius: "16px",
                padding: "32px",
                height: "100%",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: theme.colors.accentRed,
                  margin: "0 0 24px",
                }}
              >
                The Problem
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <BulletPoint text="Most DeFi yield is unsustainable" delay={15} />
                <BulletPoint text="Mercenary capital chases APY" delay={20} />
                <BulletPoint text="Communities disappear after TGE" delay={25} />
                <BulletPoint text="Airdrop hunters, not allocators" delay={30} />
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* The Goal */}
        <div style={{ flex: 1 }}>
          <AnimatedElement delay={15}>
            <div
              style={{
                background: "rgba(0,206,201,0.08)",
                border: "1px solid rgba(0,206,201,0.2)",
                borderRadius: "16px",
                padding: "32px",
                height: "100%",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: theme.colors.accent,
                  margin: "0 0 24px",
                }}
              >
                The Goal
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <BulletPoint text="First 100 quality investors" delay={20} />
                <BulletPoint text="Pre-token → long-term allocators" delay={25} />
                <BulletPoint text="Community that sticks post-launch" delay={30} />
                <BulletPoint text="Sustainable, trust-based growth" delay={35} />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </SlideLayout>
  );
};
