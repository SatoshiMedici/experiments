import React from "react";
import { SlideLayout } from "../components/SlideLayout";
import { theme } from "../theme";

const WeekCard: React.FC<{
  week: string;
  title: string;
  items: string[];
  color: string;
}> = ({ week, title, items, color }) => (
  <div style={{ flex: 1 }}>
    <div
      style={{
        background: "white",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "16px",
        padding: "28px",
        height: "100%",
        borderTop: `3px solid ${color}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "8px",
        }}
      >
        {week}
      </div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: theme.colors.text,
          margin: "0 0 20px",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
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
            <span style={{ fontSize: "15px", color: theme.colors.textSecondary, lineHeight: 1.5 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Slide3First100: React.FC = () => {
  return (
    <SlideLayout slideNumber={3} totalSlides={7}>
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
        First 100 Investors in 30 Days
      </h2>
      <p
        style={{
          fontSize: "18px",
          color: theme.colors.textMuted,
          margin: "8px 0 36px",
          fontStyle: "italic",
        }}
      >
        Quality over quantity. Hand-picked, not spray-and-pray.
      </p>

      <div style={{ display: "flex", gap: "24px", flex: 1 }}>
        <WeekCard
          week="Week 1"
          title="Foundation"
          items={[
            "Build target list: 300 DeFi-native accounts",
            "Launch waitlist landing page",
            "Personal outreach to 20 warm contacts",
          ]}
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
          color={theme.colors.accentGreen}
        />
      </div>
    </SlideLayout>
  );
};
