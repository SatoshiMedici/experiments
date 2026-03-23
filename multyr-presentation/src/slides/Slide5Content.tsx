import React from "react";
import { SlideLayout } from "../components/SlideLayout";
import { theme } from "../theme";

const TweetCard: React.FC<{
  title: string;
  content: string;
  accent: string;
}> = ({ title, content, accent }) => (
  <div style={{ flex: 1 }}>
    <div
      style={{
        background: "white",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "16px",
        padding: "28px",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
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
          fontSize: "13px",
          fontWeight: 700,
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
          fontSize: "15px",
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

export const Slide5Content: React.FC = () => {
  return (
    <SlideLayout slideNumber={5} totalSlides={7}>
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
        Content That Builds Trust
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: theme.colors.textMuted,
          margin: "8px 0 36px",
          fontStyle: "italic",
        }}
      >
        No hype. Clarity, transparency, value.
      </p>

      <div style={{ display: "flex", gap: "24px", flex: 1 }}>
        <TweetCard
          title="The Problem"
          content="Most DeFi yield is unsustainable. You're either chasing emissions that go to zero or taking risks you don't understand. Multyr is different: yield strategies designed for capital that wants to stay."
          accent={theme.colors.accentRed}
        />
        <TweetCard
          title="The Value Prop"
          content="We're not here to compete on APY. We're here to build strategies that still make sense in 12 months. Sustainable yield. Transparent risk. No gimmicks. That's Multyr."
          accent={theme.colors.primary}
        />
        <TweetCard
          title="The Trust Angle"
          content="Before we launch, we're sharing everything — how our strategies work, where the yield comes from, what the risks are. If you're allocating capital, you deserve to understand what you're allocating into."
          accent={theme.colors.accent}
        />
      </div>
    </SlideLayout>
  );
};
