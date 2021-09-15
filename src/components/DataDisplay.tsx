import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useTime } from "../modules/three/module";
import data from "../data/dummy.json";

const controllerWidth = 600;
const background =
  "linear-gradient(#00000015 0%, #00000020 20%, #00000025 50%, #00000020 80%, #00000015 100%)";

export default function DataDisplay() {
  const time = useTime();
  const d = Array.from(data)
    .reverse()
    .find((d) => d[3] < time);
  if (!d) return null;

  const long = `${d[0].toFixed(6)}° E`;
  const lat = `${d[1].toFixed(6)}° N`;
  const elev = `${d[2].toFixed(2)}m`;

  return (
    <Box
      position="fixed"
      left={`calc(50vw - ${controllerWidth / 2}px)`}
      width={controllerWidth}
      top={0}
      mt={2}
      style={{ background }}
      color="#fff6"
      borderRadius={4}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Typography style={{ marginRight: 16 }}>{`long: ${long}`}</Typography>
      <Typography style={{ marginRight: 16 }}>{`lat: ${lat}`}</Typography>
      <Typography style={{ marginRight: 16 }}>{elev}</Typography>
      <Typography>{`${d[3]}ms`}</Typography>
    </Box>
  );
}
