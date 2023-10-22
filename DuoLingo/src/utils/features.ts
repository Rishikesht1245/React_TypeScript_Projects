import axios from "axios";
// for generating random words
import { generate } from "random-words";
import _ from "lodash";

// function to generate mcq options
const generateMCQ = (meaning: { Text: string }[], index: number): string[] => {
  const correctAnswer: string = meaning[index].Text;

  // for removing the correct answer being included in the incorrect options array
  const allMeaningExceptForCorrect = meaning.filter(
    (item) => item.Text !== correctAnswer
  );

  //    _ is from lodash and which is used to size the array to 3
  const incorrectOptions: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((item) => item.Text);

  //   shuffle is method present inside lodash for shuffling the array
  const mcqOptions = _.shuffle([...incorrectOptions, correctAnswer]);
  return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<WordType[]> => {
  try {
    //converting string array to array of objects as data requirement for the API
    const words = generate(8).map((item) => ({ Text: item }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          //translate to
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": import.meta.env.VITE_APP_TRANSLATE_API,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    //     translated words
    const recieve: FetchedDataType[] = response.data;

    const wordsArr: WordType[] = recieve.map((item, index) => {
      // creating options for radio inputs in quiz
      const options: string[] = generateMCQ(words, index);
      // translations will be another array with 0 and length element where 0 contain the text and to keys
      return {
        word: item.translations[0].text,
        meaning: words[index].Text,
        options,
      };
    });

    return wordsArr;
  } catch (error) {
    console.log(error);
    throw new Error("Some Error");
  }
};

// getting the correct answers count
export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Arrays are not matching");
  let matchedCount: number = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchedCount++;
  }
  return matchedCount;
};

// fetching the audio -- returns in base 64 format
export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  // setting language code according to api
  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: {
        key: import.meta.env.VITE_APP_TEXT_TO_SPEECH_API,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "86837ed7b7msh4b10c926c16d06ep1acadejsne3b0a5015636",
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );
  return data;
};
