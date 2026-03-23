import React from "react";
import { theme } from "../theme";

export const SlideLayout: React.FC<{
  children: React.ReactNode;
  slideNumber?: number;
  totalSlides?: number;
}> = ({ children, slideNumber, totalSlides }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: theme.colors.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle decorative gradient */}
      <div
        style={{
          position: "absolute",
          top: "-300px",
          right: "-200px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-300px",
          left: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(8,145,178,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "48px 64px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const AnimatedElement: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};
