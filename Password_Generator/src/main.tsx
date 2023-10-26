import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import myTheme from "./theme.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={myTheme}>
    <CssBaseline />
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </ThemeProvider>
);
