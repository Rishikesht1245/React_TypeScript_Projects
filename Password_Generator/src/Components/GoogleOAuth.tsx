import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../firebase";
import { UserCredential, getIdToken, signInWithPopup } from "firebase/auth";
import { saveLocally } from "../utils/localStorage";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

const GoogleOAuth = ({
  setEmail,
}: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleLogin = (): void => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const { user } = result;
        if (user) {
          // accessing the access Token
          user
            .getIdToken()
            .then((accessToken: string) => {
              saveLocally(accessToken);
            })
            .catch((error) => console.log("error in access token :", error));
          // store the email for the user
          const { email, displayName, photoURL } = user;
          setEmail(email as string);
          toast((t) => (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              <img
                src={photoURL as string}
                width={"35"}
                height={"35"}
                style={{ borderRadius: "50%" }}
              />
              <span>
                Welcome <b>{displayName?.split(" ")[0]}</b>
              </span>
              <button
                style={{
                  border: "none",
                  borderRadius: "50%",
                }}
                onClick={() => toast.dismiss(t.id)}
              >
                <CloseIcon />
              </button>
            </span>
          ));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error loggin in");
      });
  };
  return (
    <Button
      onClick={handleLogin}
      variant="outlined"
      startIcon={<GoogleIcon sx={{ color: "#07F918" }} />}
      sx={{ backgroundColor: "#122546", color: "white" }}
    >
      Sign in with Google
    </Button>
  );
};
export default GoogleOAuth;
