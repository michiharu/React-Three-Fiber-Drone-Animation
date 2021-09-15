import React from "react";
import { useDispatch } from "react-redux";
import { Box, IconButton } from "@material-ui/core";
import Play from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import ThreeModule, { useStop } from "../modules/three/module";

export default function Controller() {
  const dispatch = useDispatch();
  const stop = useStop();

  const onClickPlay = () => {
    dispatch(ThreeModule.actions.play(!stop));
  };

  return (
    <Box
      position="fixed"
      left="50vw"
      style={{ transform: "translate3d(-50%, 0, 0)" }}
      bottom={0}
      mb={2}
      p={1}
      bgcolor="#00000030"
      borderRadius={4}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton onClick={onClickPlay}>
        {stop ? <Play /> : <Pause />}
      </IconButton>
    </Box>
  );
}
