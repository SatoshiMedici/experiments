import React from "react";
import { Composition } from "remotion";
import { MultyrPresentation } from "./Presentation";

const SLIDE_DURATION = 180;
const TOTAL_SLIDES = 7;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MultyrPresentation"
        component={MultyrPresentation}
        durationInFrames={SLIDE_DURATION * TOTAL_SLIDES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
