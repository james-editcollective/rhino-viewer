import React from "react";
import style from "../../styles/experience.module.css";
import { Canvas } from "@react-three/fiber";
import { ModelLoader } from "./ModelLoader";
import Control from "./Control";

export const Experience = ({ path }) => {
  return (
    <div className={style.canvas_container}>
      <Canvas>
        <ModelLoader path={path} />
        <ambientLight />
        <Control />
      </Canvas>
    </div>
  );
};
