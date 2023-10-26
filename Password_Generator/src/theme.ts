import { createTheme } from "@mui/material/styles";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(255,255,255,0.9)",
    },
    secondary: {
      main: "#fff", // Set secondary color as white
    },
  },
  typography: {
    fontWeightBold: 600, // You can adjust this value as needed
  },
});

export default myTheme;
