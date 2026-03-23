import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { theme } from "../theme";

export const SlideLayout: React.FC<{
  children: React.ReactNode;
  slideNumber?: number;
  totalSlides?: number;
}> = ({ children, slideNumber, totalSlides }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

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
        opacity: fadeIn,
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(108,92,231,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,92,231,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,206,201,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
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
          padding: "60px 80px",
        }}
      >
        {children}
      </div>
      {/* Bottom bar */}
      {slideNumber && totalSlides && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: theme.colors.border,
            zIndex: 2,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(slideNumber / totalSlides) * 100}%`,
              background: theme.colors.gradient3,
              transition: "width 0.3s",
            }}
          />
        </div>
      )}
    </div>
  );
};

export const AnimatedElement: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  style?: React.CSSProperties;
}> = ({ children, delay = 0, direction = "up", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const translateMap = {
    up: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
    left: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
    right: `translateX(${interpolate(progress, [0, 1], [30, 0])}px)`,
    none: "none",
  };

  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: translateMap[direction],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
