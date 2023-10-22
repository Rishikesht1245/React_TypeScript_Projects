import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "../redux/slices";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // root is the name of the reducer mentioned in the store configuration
  const { words } = useSelector(
    (state: { root: InitialStateType }) => state.root
  );

  const nextHandler = (): void => {
    // for storing all the answers
    setResult((prev) => [...prev, answer]);
    // incrementing the count
    setCount((prev) => prev + 1);

    // initializing the next answer and deselecting the previous answer
    setAnswer("");
  };

  useEffect(() => {
    if (count > words.length - 1) navigate("/result");
    dispatch(saveResult(result));
  }, [result]);

  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      <Typography variant="h3">
        {count + 1} - {words[count]?.word}
      </Typography>

      <FormControl>
        <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>Meaning</FormLabel>
        {/* Radio group is used for group of radio buttons */}
        <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)}>
          {words[count]?.options.map((option) => (
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={option}
              key={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        sx={{ margin: "3rem 0" }}
        variant="contained"
        fullWidth
        onClick={nextHandler}
        disabled={answer === ""}
      >
        {count === words.length - 1 ? "Submit" : "next"}
      </Button>
    </Container>
  );
};
export default Quiz;
