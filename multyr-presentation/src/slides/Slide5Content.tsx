import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const TweetCard: React.FC<{
  title: string;
  content: string;
  delay: number;
  accent: string;
}> = ({ title, content, delay, accent }) => {
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
        flex: 1,
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          background: theme.colors.bgCard,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: "16px",
          padding: "28px",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: accent,
          }}
        />
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: accent,
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "16px",
          }}
        >
          {title}
        </div>
        <p
          style={{
            fontSize: "17px",
            color: theme.colors.textSecondary,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export const Slide5Content: React.FC = () => {
  return (
    <SlideLayout slideNumber={5} totalSlides={7}>
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
          Content That Builds Trust
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
          No hype. Clarity, transparency, value.
        </p>
      </AnimatedElement>

      <div style={{ display: "flex", gap: "30px", flex: 1 }}>
        <TweetCard
          title="The Problem"
          content="Most DeFi yield is unsustainable. You're either chasing emissions that go to zero or taking risks you don't understand. Multyr is different: yield strategies designed for capital that wants to stay."
          delay={10}
          accent={theme.colors.accentRed}
        />
        <TweetCard
          title="The Value Prop"
          content="We're not here to compete on APY. We're here to build strategies that still make sense in 12 months. Sustainable yield. Transparent risk. No gimmicks. That's Multyr."
          delay={20}
          accent={theme.colors.primary}
        />
        <TweetCard
          title="The Trust Angle"
          content="Before we launch, we're sharing everything — how our strategies work, where the yield comes from, what the risks are. If you're allocating capital, you deserve to understand what you're allocating into."
          delay={30}
          accent={theme.colors.accent}
        />
      </div>
    </SlideLayout>
  );
};
