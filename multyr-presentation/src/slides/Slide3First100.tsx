import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

const WeekCard: React.FC<{
  week: string;
  title: string;
  items: string[];
  delay: number;
  color: string;
}> = ({ week, title, items, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18 } });

  return (
    <div
      style={{
        flex: 1,
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          background: theme.colors.bgCard,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: "16px",
          padding: "28px",
          height: "100%",
          borderTop: `3px solid ${color}`,
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "8px",
          }}
        >
          {week}
        </div>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: theme.colors.text,
            margin: "0 0 20px",
          }}
        >
          {title}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: color,
                  marginTop: "9px",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "16px",
                  color: theme.colors.textSecondary,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Slide3First100: React.FC = () => {
  return (
    <SlideLayout slideNumber={3} totalSlides={7}>
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
          First 100 Investors in 30 Days
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
          Quality over quantity. Hand-picked, not spray-and-pray.
        </p>
      </AnimatedElement>

      <div style={{ display: "flex", gap: "30px", flex: 1 }}>
        <WeekCard
          week="Week 1"
          title="Foundation"
          items={[
            "Build target list: 300 DeFi-native accounts",
            "Launch waitlist landing page",
            "Personal outreach to 20 warm contacts",
          ]}
          delay={10}
          color={theme.colors.primary}
        />
        <WeekCard
          week="Week 2-3"
          title="Outreach & Content"
          items={[
            "150 personalized DMs referencing on-chain activity",
            "2-3 threads on sustainable yield thesis",
            "Daily engagement in CT conversations",
          ]}
          delay={20}
          color={theme.colors.accent}
        />
        <WeekCard
          week="Week 4"
          title="Conversion"
          items={[
            "Twitter Space or Discord AMA",
            "Whitelist for engaged participants",
            "Follow up and close commitments",
          ]}
          delay={30}
          color={theme.colors.accentGreen}
        />
      </div>
    </SlideLayout>
  );
};
