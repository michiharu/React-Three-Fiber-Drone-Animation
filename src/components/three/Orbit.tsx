import React from "react";
import { Vector3 } from "three";

type Props = {
  flight: number[][];
}

export default function Orbit(props: Props) {
  const { flight } = props;
  
  return (
    <line>
      <geometry
        attach="geometry"
        vertices={flight.map(d => new Vector3(...d))}
      />
      <lineBasicMaterial attach="material" color="#666" />
    </line>
  );
}
