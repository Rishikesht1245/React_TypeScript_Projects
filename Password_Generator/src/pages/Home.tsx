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
  Slider,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import bgImg from "/greyBgImg.jpg";
import CheckBox from "../Components/UI/CheckBox";
import { ChangeEvent, useState } from "react";
import Buttons from "../Components/UI/Buttons";
import SymbolButton from "../Components/UI/SymbolButton";
import GoogleOAuth from "../Components/GoogleOAuth";

const Home = () => {
  const [length, setLength] = useState<number>(6);
  const [options, setOptions] = useState<OptionsType>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    specialChars: true,
  });
  const login: boolean = false;
  const handleLengthChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") setLength(newValue);
  };

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
                <Stack direction={"row"}>
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
                <Stack direction={"row"}>
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
            {login ? (
              <>
                <Buttons text="Generate" width="100%" color="#1E5C0D" />
                <SymbolButton
                  text="Save Password"
                  color="#17172E"
                  action={"save"}
                  width="90%"
                />
                <SymbolButton
                  text="Saved Passwords"
                  color="#2E172E"
                  action={"passwords"}
                  width="90%"
                />
                <SymbolButton
                  text="Logout"
                  color="black"
                  action={"logout"}
                  width="45%"
                />
              </>
            ) : (
              <GoogleOAuth />
            )}

            {/* logout button */}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
export default Home;
