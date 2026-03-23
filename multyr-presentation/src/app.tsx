import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { MultyrPresentation } from "./Presentation";

const SLIDE_DURATION = 180;
const TOTAL_SLIDES = 7;

const App: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Player
        component={MultyrPresentation}
        durationInFrames={SLIDE_DURATION * TOTAL_SLIDES}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls
        autoPlay
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
        }}
      />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
