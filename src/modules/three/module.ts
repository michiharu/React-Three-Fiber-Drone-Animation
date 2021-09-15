import { createSlice, PayloadAction as PA } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Vector3 } from "three";
import data from "../../data/dummy.json";

export interface ThreeState {
  stop: boolean;
  grabbing: boolean;
  time: number;
  stopDuration: number;
  flight: [number, number, number, number][];
  dronePosition: Parameters<THREE.Vector3["set"]>;
  droneDelta: Parameters<THREE.Vector3["set"]>;
  cameraPosition: Parameters<THREE.Vector3["set"]>;
  cameraDelta: Parameters<THREE.Vector3["set"]>;
}

const initialState: ThreeState = {
  stop: false,
  grabbing: false,
  time: 0,
  stopDuration: 0,
  // 緯度35度基準
  flight: data.map((d) => [
    (d[0] - data[0][0]) * 91287.7885,
    (d[1] - data[0][1]) * 110940.5844,
    d[2],
    d[3],
  ]),
  dronePosition: [0, 0, 0],
  droneDelta: [0, 0, 0],
  cameraPosition: [10, -8, 2],
  cameraDelta: [2, -10, 5],
};

const ThreeModule = createSlice({
  name: "three",
  initialState,
  reducers: {
    play: (state, { payload }: PA<boolean>) => {
      return { ...state, stop: payload };
    },
    updateByFrame: (state, { payload: now }: PA<number>) => {
      if (state.stop) {
        return {
          ...state,
          stopDuration: now - state.time,
          droneDelta: [0, 0, 0],
        };
      }
      const time = now - state.stopDuration;
      const moment1 = Array.from(state.flight)
        .reverse()
        .find((d) => d[3] < time);
      const moment2 = state.flight.find((d) => time <= d[3]);
      if (!moment1 || !moment2) {
        return {
          ...state,
          stop: true,
          stopDuration: now - state.time,
          droneDelta: [0, 0, 0],
        };
      }
      const rate = (time - moment1[3]) / (moment2[3] - moment1[3]);
      const next = new Vector3(
        moment1[0] + (moment2[0] - moment1[0]) * rate,
        moment1[1] + (moment2[1] - moment1[1]) * rate,
        moment1[2] + (moment2[2] - moment1[2]) * rate
      );
      const before = new Vector3(...state.dronePosition);
      return {
        ...state,
        time,
        dronePosition: next.toArray() as Parameters<THREE.Vector3["set"]>,
        droneDelta: next.add(before.negate()).toArray() as Parameters<
          THREE.Vector3["set"]
        >,
      };
    },
    setCameraPosition: (
      state,
      { payload }: PA<Parameters<THREE.Vector3["set"]>>
    ) => {
      const next = new Vector3(...payload);
      const before = new Vector3(...state.cameraPosition);
      return {
        ...state,
        cameraPosition: next.toArray() as Parameters<THREE.Vector3["set"]>,
        cameraDelta: next.add(before.negate()).toArray() as Parameters<
          THREE.Vector3["set"]
        >,
      };
    },
  },
});

export const useStop = (): boolean =>
  useSelector((state: RootState) => state.three.stop);

export const useTime = (): number =>
  useSelector((state: RootState) => state.three.time);

export const useCameraPosition = (): Parameters<THREE.Vector3["set"]>[] =>
  useSelector((state: RootState) => [
    state.three.cameraPosition,
    state.three.cameraDelta,
  ]);

export const useDronePosition = (): Parameters<THREE.Vector3["set"]>[] =>
  useSelector((state: RootState) => [
    state.three.dronePosition,
    state.three.droneDelta,
  ]);

export const useFlight = (): number[][] =>
  useSelector((state: RootState) => state.three.flight);

export default ThreeModule;
