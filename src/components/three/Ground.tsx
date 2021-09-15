import React from "react";
import {} from "react-three-fiber";

export default function Ground() {
  const panelCount = 10;
  const r = 0.4;
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[0.1, r, r]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <sphereGeometry attach="geometry" args={[0.1, r, r]} />
        <meshStandardMaterial attach="material" color="red" />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <sphereGeometry attach="geometry" args={[0.1, r, r]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
      <mesh position={[0, 0, 3]}>
        <sphereGeometry attach="geometry" args={[0.1, r, r]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
      {[...Array(panelCount)].map((_, i) => {
        const x = i - panelCount / 2;
        return [...Array(panelCount)].map((_, j) => {
          const y = j - panelCount / 2;
          const color = (x + y) % 2 === 0 ? "#333333" : "#222222";
          return (
            <mesh
              key={`${x}-${y}`}
              position={[(x + 0.5) * 20, (y + 0.5) * 20, 0]}
              receiveShadow
            >
              <planeGeometry attach="geometry" args={[20, 20]} />
              <meshStandardMaterial attach="material" color={color} />
            </mesh>
          );
        });
      })}
    </>
  );
}
