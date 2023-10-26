import {
  Box,
  Paper,
  Stack,
  Typography,
  Container,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Slider,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import bgImg from "/greyBgImg.jpg";
import CheckBox from "../Components/UI/CheckBox";
import { ChangeEvent, useEffect, useState } from "react";
import Buttons from "../Components/UI/Buttons";
import SymbolButton from "../Components/UI/SymbolButton";
import GoogleOAuth from "../Components/GoogleOAuth";
import { getLocalData } from "../utils/localStorage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Logout from "../Components/Logout";
import { generatePassword } from "../utils/generatePassword";
import toast from "react-hot-toast";
import { savePassword } from "../models/savePassword";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [length, setLength] = useState<number>(6);
  const [options, setOptions] = useState<OptionsType>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    specialChars: true,
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLengthChange = (event: Event, newValue: number | number[]) => {
    if (event) if (typeof newValue === "number") setLength(newValue);
  };

  useEffect(() => {
    // when ever page refreshes the function will be invoked and it will validate whether user is logged in or not using onAuthStateChange method
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email as string);
      } else {
        setEmail("");
      }
    });
  }, []);

  //   change handler for check boxes
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setOptions((prev: OptionsType) => ({
      ...prev,
      // as keyof OptionsType should be used here other wise the value type will be any
      // to mention the key should be allowed only if it is present in the OptionsType
      [name as keyof OptionsType]: !prev[name as keyof OptionsType],
    }));
  };

  const handleGeneratePassword = () => {
    if (length < 4) {
      setPassword("");
      return toast.error("Password length is less than 4");
    }
    let optionsValid: boolean = false;
    optionsValid = Object.values(options).some((option) => option === true);
    if (optionsValid) {
      return setPassword(generatePassword(length, options));
    } else {
      setPassword("");
      return toast.error("Please select Preferences");
    }
  };

  const saveHandler = (): void => {
    toast(
      (t) => (
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const passwordName = e?.currentTarget?.passwordName.value;

            if (!passwordName) {
              return false;
            }
            toast.dismiss(t.id);
            return saveNewPassword(passwordName);
          }}
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <input
              id="outlined-adornment-password-save"
              type="text"
              readOnly
              value={password}
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                padding: "10px",
                borderRadius: "5px",
              }}
            />

            <input
              id="outlined-adornment-password-name"
              type="text"
              name="passwordName"
              // placeholder="Password name"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                padding: "10px",
                borderRadius: "5px",
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            marginTop={"1rem"}
          >
            <Button
              variant="outlined"
              type="submit"
              sx={{ backgroundColor: "green", color: "white" }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => toast.dismiss(t.id)}
              sx={{ backgroundColor: "red", color: "white" }}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      ),
      {
        style: {
          backgroundColor: "rgba(0,0,0,0.8)",
        },
      }
    );
  };

  const saveNewPassword = (passwordName: string): Promise<void> => {
    return savePassword(email, { name: passwordName, password });
  };
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
            padding: "2rem",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Typography
            variant="h6"
            color="secondary"
            align="center"
            textTransform={"uppercase"}
            sx={{ textDecoration: "underline" }}
          >
            Password Generator
          </Typography>
          <Stack marginTop={"1rem"} gap={"1rem"}>
            <FormControl
              sx={{ m: 1, width: "100%", p: 1, rowGap: "1.4rem" }}
              variant="standard"
              color="primary"
            >
              <Input
                id="outlined-adornment-password"
                type="text"
                readOnly
                value={password}
                placeholder="Select Preferences"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.6)",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.7)",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => {
                        if (!password)
                          return toast.error("Generate a password");
                        navigator.clipboard.writeText(password);
                        toast.success("Password copied to clipboard");
                      }}
                    >
                      <FileCopyIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* input - range */}
              <Box>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography variant="h6" color="secondary">
                    Password Length
                  </Typography>
                  <Typography variant="h6" color="secondary">
                    {length}
                  </Typography>
                </Stack>
                <Slider
                  color="secondary"
                  aria-label="Length"
                  defaultValue={6}
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={30}
                  value={length}
                  onChange={handleLengthChange}
                />
              </Box>
              {/* check boxes */}
              <Stack justifyContent={"center"} marginTop={"-2rem"}>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <CheckBox
                    label="Lowercase ( a-z )"
                    option={options.lowercase}
                    handleCheck={handleCheckChange}
                    name="lowercase"
                  />
                  <CheckBox
                    label="Uppercase ( A-Z )"
                    option={options.uppercase}
                    handleCheck={handleCheckChange}
                    name="uppercase"
                  />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <CheckBox
                    label="Symbols ( ~!@#$%^ )"
                    option={options.specialChars}
                    handleCheck={handleCheckChange}
                    name="specialChars"
                  />
                  <CheckBox
                    label="Numbers ( 0-9 )"
                    option={options.numbers}
                    handleCheck={handleCheckChange}
                    name="numbers"
                  />
                </Stack>
              </Stack>
            </FormControl>
            <Buttons
              text="Generate"
              width="100%"
              color="#1E5C0D"
              onClick={handleGeneratePassword}
            />
            {email || getLocalData() ? (
              <>
                <SymbolButton
                  text="Save Password"
                  color="#17172E"
                  action={"save"}
                  width="90%"
                  onClick={
                    password
                      ? saveHandler
                      : () => toast.error("Please generate a password")
                  }
                />
                <SymbolButton
                  text="Saved Passwords"
                  color="#2E172E"
                  action={"passwords"}
                  width="90%"
                  onClick={() => navigate("/saved-passwords")}
                />
                <Logout width="45%" />
              </>
            ) : (
              <GoogleOAuth setEmail={setEmail} />
            )}

            {/* logout button */}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
export default Home;
