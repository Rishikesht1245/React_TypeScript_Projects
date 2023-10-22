import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Typography, Stack } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  // root is the name of the reducer mentioned in the store configuration
  const { loading, error, words } = useSelector(
    (state: { root: InitialStateType }) => state.root
  );

  // calling the translator api to fetch the meaning -- pass language as params
  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((data: WordType[]) => {
        //saving the words array in the state
        dispatch(getWordsSuccess(data));
      })
      .catch((error) => {
        dispatch(getWordsFail(error));
      });

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, [params]);

  // for moving to the next word in learing
  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  // handling audio inputs
  const audioHandler = async () => {
    // if player exists no need to fetch again just play again
    const player: HTMLAudioElement = audioRef.current!;
    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);
      setAudioSrc(data);
    }
  };
  if (loading) return <Loader />;
  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      {/* when user click on the audio button audio fetch function will be invoked and it will set the audioSrc */}
      {/* audio tag wont show in UI */}
      {audioSrc && <audio ref={audioRef} src={audioSrc} autoPlay></audio>}
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          count === words.length - 1 || count <= 0
            ? navigate(-1)
            : setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>
      <Typography m={"2rem 0"} variant="h6" fontWeight={"bold"}>
        Learning made easy
      </Typography>

      <Stack direction="row" spacing={"1rem"}>
        {/* word */}
        <Typography variant="h4">
          {count + 1} - {words[count]?.word}
        </Typography>
        {/* meaning */}
        <Typography color={"blue"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
        {/* audio button */}
        <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}>
          <VolumeUp />
        </Button>
      </Stack>
      {/* next button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: "2rem" }}
        // if learning is hover navigate to quiz page
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "Text" : "Next"}
      </Button>
    </Container>
  );
};
export default Learning;
