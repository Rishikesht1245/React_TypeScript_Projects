import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  margin: "0.5rem",
  textDecoration: "none",
  color: "white",
};

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          marginRight={"auto"}
          textTransform={"uppercase"}
        >
          DuoLingo
        </Typography>
        <Link style={styles} to={"/"}>
          Home
        </Link>
        <Link style={styles} to={"/login"}>
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
