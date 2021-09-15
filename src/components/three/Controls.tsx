import React, { useRef } from "react";
// eslint-disable-next-line
import { extend, useThree, useFrame, ReactThreeFiber } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";

extend({ OrbitControls });

// インターフェイスIntrinsicElementsにorbitControls の定義を追加
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}

type Props = {
  isControl: boolean;
  drone: Parameters<THREE.Vector3["set"]>[];
  updateCamera: (p: Parameters<THREE.Vector3["set"]>) => void;
};

export default function Controls(props: Props) {
  const { isControl, drone, updateCamera } = props;
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  useFrame(() => {
    camera.position.add(new Vector3(...drone[1]));
    controlsRef.current?.update();
    const cameraPosition = camera.position
      .toArray()
      .map((num) => Number(num.toFixed(6)));
    updateCamera(cameraPosition as Parameters<THREE.Vector3["set"]>);
  });

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      // lookAt
      target={new Vector3(...drone[0])}
      enabled={isControl}
      enableDamping={true}
      enableRotate={true}
      enableZoom={true}
      enablePan={false}
      rotateSpeed={1.0}
      zoomSpeed={1.0}
      panSpeed={2.0}
      minDistance={10}
      maxDistance={200}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  );
}
