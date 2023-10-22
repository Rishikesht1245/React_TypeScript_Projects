/// <reference types="vite/client" />

type LangType = "ja" | "hi" | "es" | "fr";

type Languages = {
  name: string;
  code: LangType;
};

type WordType = {
  word: string;
  meaning: string;
  options: string[];
};
type InitialStateType = {
  loading: boolean;
  result: string[];
  error?: string;
  words: WordType[];
};

type FetchedDataType = {
  translations: { text: string; to: string }[];
};
