import { useEffect, useState } from "react";
import { Box, Container, Stack, Paper, Button } from "@mui/material";
import bgImg from "/greyBgImg.jpg";
import PasswordTable from "../Components/PasswordTable";
import { getSavedPasswords } from "../models/getSavedPasswords";
import toast from "react-hot-toast/headless";
import { getLocalData, saveLocally } from "../utils/localStorage";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../Components/Logout";

const SavedPasswords = () => {
  const [savedPasswords, setSavedPasswords] = useState<SavedPasswordType[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const navigate = useNavigate();

  // calling the function getSavedPasswords present in models which returns all the passwords
  const getAllPasswords = async () => {
    try {
      setPending(true);
      const passwords = await getSavedPasswords();
      setSavedPasswords(passwords);
      setPending(false);
    } catch (error) {
      console.log("Error in get All passwords :", error);
      toast.error("Please try again !");
      setPending(false);
    }
  };

  useEffect(() => {
    // saving the token in local storage if it is lost
    const token = getLocalData();
    if (!token) {
      const { currentUser } = getAuth();
      currentUser
        ?.getIdToken()
        .then((token) => saveLocally(token))
        .catch(() => navigate("/"));
    }
    getAllPasswords();
  }, []);
  return (
    <Box
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "10px",
          }}
        >
          <PasswordTable
            pending={pending}
            passwords={savedPasswords}
            getAllPasswords={getAllPasswords}
          />
          <Stack
            direction={"row"}
            justifyContent={"center"}
            gap={"1rem"}
            alignItems={"center"}
            marginTop={"1rem"}
          >
            <Link to="/">
              <Button variant="outlined" sx={{ backgroundColor: "green" }}>
                Generate
              </Button>
            </Link>
            <Logout width="100%" />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
export default SavedPasswords;
