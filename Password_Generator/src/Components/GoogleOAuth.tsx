import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleOAuth = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon sx={{ color: "#07F918" }} />}
      sx={{ backgroundColor: "#122546", color: "white" }}
    >
      Sign in with Google
    </Button>
  );
};
export default GoogleOAuth;
