import { Container, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages: Languages[] = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const languageSelectHandler = (language: LangType): void => {
    navigate(`/learn?language=${language}`);
  };
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        fontWeight={"bold"}
        p={"2rem"}
        textAlign={"center"}
      >
        Welcome, Begin your journey of learning
      </Typography>

      {/* languages button row wise */}
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((item) => (
          <Button
            key={item.code}
            variant="contained"
            onClick={() => languageSelectHandler(item.code)}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
      <Typography variant="h6" textAlign={"center"} fontWeight={"bold"}>
        Choose one language from above
      </Typography>
    </Container>
  );
};
export default Home;
