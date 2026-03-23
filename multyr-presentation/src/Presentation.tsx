import React from "react";
import { useCurrentFrame, useVideoConfig, Sequence } from "remotion";
import { Slide1Title } from "./slides/Slide1Title";
import { Slide2Challenge } from "./slides/Slide2Challenge";
import { Slide3First100 } from "./slides/Slide3First100";
import { Slide4Funnel } from "./slides/Slide4Funnel";
import { Slide5Content } from "./slides/Slide5Content";
import { Slide6Quality } from "./slides/Slide6Quality";
import { Slide7Budget } from "./slides/Slide7Budget";

const SLIDE_DURATION = 180; // 6 seconds per slide at 30fps

export const MultyrPresentation: React.FC = () => {
  return (
    <div style={{ flex: 1, background: "#0a0a0f" }}>
      <Sequence from={0} durationInFrames={SLIDE_DURATION} name="Title">
        <Slide1Title />
      </Sequence>
      <Sequence
        from={SLIDE_DURATION}
        durationInFrames={SLIDE_DURATION}
        name="The Challenge"
      >
        <Slide2Challenge />
      </Sequence>
      <Sequence
        from={SLIDE_DURATION * 2}
        durationInFrames={SLIDE_DURATION}
        name="First 100 Investors"
      >
        <Slide3First100 />
      </Sequence>
      <Sequence
        from={SLIDE_DURATION * 3}
        durationInFrames={SLIDE_DURATION}
        name="The Funnel"
      >
        <Slide4Funnel />
      </Sequence>
      <Sequence
        from={SLIDE_DURATION * 4}
        durationInFrames={SLIDE_DURATION}
        name="Content Strategy"
      >
        <Slide5Content />
      </Sequence>
      <Sequence
        from={SLIDE_DURATION * 5}
        durationInFrames={SLIDE_DURATION}
        name="Quality vs Quantity"
      >
        <Slide6Quality />
      </Sequence>
      <Sequence
        from={SLIDE_DURATION * 6}
        durationInFrames={SLIDE_DURATION}
        name="Budget"
      >
        <Slide7Budget />
      </Sequence>
    </div>
  );
};
