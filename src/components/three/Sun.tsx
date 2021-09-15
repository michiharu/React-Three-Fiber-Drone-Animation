import React from "react";
import { Color } from "three/src/math/Color";

export default function Sun() {

  return (
    <>
      <ambientLight
        color={new Color("#FFFEF4")}
        intensity={0.2}
      />
      <directionalLight
        castShadow
        position={[2, 2, 5]}
        color={new Color("#FFFEF4")}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}
