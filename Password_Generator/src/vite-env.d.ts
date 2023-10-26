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
  onClick?: () => void;
}

interface UserType {
  displayName: string;
  email: string;
  photoUrl: string;
  accessToken: string;
}

interface SavedPasswordType {
  id: string;
  name: string;
  password: string;
}

interface PasswordTableProps {
  pending: boolean;
  passwords: SavedPasswordType[];
  getAllPasswords: () => void;
}

interface ShowConfirmProps {
  message: string;
  handleFunction: (id: string) => Promise<any>;
  children: ReactNode;
  params: string;
}
