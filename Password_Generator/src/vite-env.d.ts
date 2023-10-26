/// <reference types="vite/client" />

interface CheckBoxProps {
  label: string;
  option: boolean;
  handleCheck: (event) => void;
  name: string;
}

interface OptionsType {
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  specialChars: boolean;
}

interface ButtonProps {
  text: string;
  color: string;
  action?: string;
  width: string;
}
