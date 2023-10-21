import { createTheme } from "@mui/material/styles";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#fc0345",
    },
  },
  typography: {
    fontWeightBold: 600, // You can adjust this value as needed
  },
});

export default myTheme;
