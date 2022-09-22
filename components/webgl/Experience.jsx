import React from "react";
import { Canvas } from "@react-three/fiber";
import { ModelLoader } from "./ModelLoader";
import Control from "./Control";

const renderOptions = {
  logarithmicDepthBuffer: true,
};

export const Experience = ({ path }) => {
  return (
    <div className="relative top-0 left-0 w-full h-full bg-zinc-700">
      <Canvas gl={renderOptions}>
        <ModelLoader path={path} />
        <ambientLight />
        <Control />
      </Canvas>
    </div>
  );
};
