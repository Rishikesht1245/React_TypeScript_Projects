import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// creating theme
import { createTheme } from "@mui/material/styles";
import { store } from "./redux/store.ts";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(255,0,0)",
    },
  },
  typography: {
    fontWeightBold: 600,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
