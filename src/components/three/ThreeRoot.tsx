import React from 'react';
import { Vector3 } from 'three';
import { Canvas } from "react-three-fiber";
import equal from "deep-equal";
import Controls from './Controls';
import Ground from './Ground';
import ThreeModule, { useCameraPosition, useDronePosition, useFlight } from '../../modules/three/module';
import { useDispatch } from 'react-redux';
import Frame from './Frame';
import Drone from './Drone';
import Sun from './Sun';
import Orbit from './Orbit';

export default function ThreeRoot() {
  const dispatch = useDispatch();
  const cp = useCameraPosition()[0];
  const drone = useDronePosition();
  const flight = useFlight();

  const update = (now: number) => {
    dispatch(ThreeModule.actions.updateByFrame(now));
  }

  const updateCamera = (next: Parameters<THREE.Vector3['set']>) => {
    if (!equal(cp, next)) {
      dispatch(ThreeModule.actions.setCameraPosition(next));
    }
  }

  const cameraOptions = {
    fov: 50,
    near: 5,
    far: 100000,
    position: new Vector3(...cp),
    up: new Vector3(0, 0, 1),
  };

  return (
    <Canvas
      shadowMap
      camera={cameraOptions}
    >
      <Frame update={update} />
      <Controls
        isControl={true}
        drone={drone}
        updateCamera={updateCamera}
      />
      <Ground />
      <Sun />
      <Orbit flight={flight} />
      <Drone dronePosition={drone[0]} />
    </Canvas>
  );
}
