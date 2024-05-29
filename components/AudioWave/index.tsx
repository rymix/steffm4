import dynamic from "next/dynamic";
import React from "react";

const SiriWave = dynamic(() => import("react-siriwave"), { ssr: false });

export const AudioWave: React.FC = () => {
  return (
    <>
      <p>farts</p>
      <SiriWave theme="ios9" />
      <p>farts</p>
    </>
  );
};

export default AudioWave;
