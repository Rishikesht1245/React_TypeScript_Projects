export const generatePassword = (
  length: number,
  options: OptionsType
): string => {
  let password: string = "";
  let chars: string = "";

  const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
  const numberChars: string = "1234567890";
  const symbolChars: string = "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  chars += options.uppercase ? uppercaseChars : "";
  chars += options.lowercase ? lowercaseChars : "";
  chars += options.numbers ? numberChars : "";
  chars += options.specialChars ? symbolChars : "";

  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * chars.length);
    password += chars[random];
  }
  return password;
};
