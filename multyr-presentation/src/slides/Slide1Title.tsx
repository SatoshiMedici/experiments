import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { SlideLayout, AnimatedElement } from "../components/SlideLayout";
import { theme } from "../theme";

export const Slide1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  const glowOpacity = interpolate(
    Math.sin(frame / 30),
    [-1, 1],
    [0.3, 0.7]
  );

  return (
    <SlideLayout slideNumber={1} totalSlides={7}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {/* Logo / Brand */}
        <AnimatedElement delay={5}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Glow behind text */}
            <div
              style={{
                position: "absolute",
                width: "400px",
                height: "120px",
                background: `radial-gradient(ellipse, rgba(108,92,231,${glowOpacity}) 0%, transparent 70%)`,
                filter: "blur(30px)",
              }}
            />
            <h1
              style={{
                fontSize: "120px",
                fontWeight: 800,
                letterSpacing: "12px",
                background: theme.colors.gradient3,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transform: `scale(${logoScale})`,
                margin: 0,
                position: "relative",
              }}
            >
              MULTYR
            </h1>
          </div>
        </AnimatedElement>

        {/* Divider line */}
        <AnimatedElement delay={15}>
          <div
            style={{
              width: "120px",
              height: "3px",
              background: theme.colors.gradient3,
              borderRadius: "2px",
            }}
          />
        </AnimatedElement>

        {/* Subtitle */}
        <AnimatedElement delay={20}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 300,
              color: theme.colors.textSecondary,
              letterSpacing: "6px",
              textTransform: "uppercase",
              margin: 0,
              textAlign: "center",
            }}
          >
            Growth & Community Lead Challenge
          </h2>
        </AnimatedElement>

        {/* Author info */}
        <AnimatedElement delay={30}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginTop: "30px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: theme.colors.text,
                margin: 0,
              }}
            >
              Mario Vasconcelos
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  color: theme.colors.accent,
                  padding: "6px 16px",
                  border: `1px solid ${theme.colors.accent}`,
                  borderRadius: "20px",
                }}
              >
                AI-First Marketing & BD
              </span>
              <span
                style={{
                  fontSize: "16px",
                  color: theme.colors.primaryLight,
                  padding: "6px 16px",
                  border: `1px solid ${theme.colors.primaryLight}`,
                  borderRadius: "20px",
                }}
              >
                7+ Years Web3
              </span>
            </div>
          </div>
        </AnimatedElement>

        {/* Date */}
        <AnimatedElement delay={40}>
          <p
            style={{
              fontSize: "16px",
              color: theme.colors.textMuted,
              margin: 0,
              marginTop: "10px",
            }}
          >
            March 2026
          </p>
        </AnimatedElement>
      </div>
    </SlideLayout>
  );
};
