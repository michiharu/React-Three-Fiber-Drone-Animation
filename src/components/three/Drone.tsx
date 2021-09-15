import React from "react";

type Props = {
  dronePosition: Parameters<THREE.Vector3['set']>;
};

export default function Drone(props: Props) {
  const { dronePosition } = props;
  return (
    <mesh position={dronePosition} castShadow>
      <sphereGeometry attach="geometry" args={[0.1, 32, 32]} />
      <meshStandardMaterial attach="material" color="white" />
    </mesh>
  );
}
