import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Box from "@material-ui/core/Box";

import { setupStore } from "../store";

import theme from "./theme";
import ThreeRoot from "./three/ThreeRoot";
import Controller from "./Controller";
import DataDisplay from "./DataDisplay";

const store = setupStore();

export default function App() {
  const [grab, setGrab] = React.useState<"grab" | "grabbing">("grab");
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          width="100vw"
          height="100vh"
          bgcolor="black"
          style={{ cursor: grab }}
          onMouseDown={() => setGrab("grabbing")}
          onMouseUp={() => setGrab("grab")}
          onMouseLeave={() => setGrab("grab")}
        >
          <ThreeRoot />
        </Box>
        <DataDisplay />
        <Controller />
      </ThemeProvider>
    </Provider>
  );
}
