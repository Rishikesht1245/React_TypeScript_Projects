import jwtDecode from "jwt-decode";

export const verifyToken = (token: string): any => {
  try {
    // if we decode the token we will get all the details like email, displayNam etc...
    return jwtDecode(token);
  } catch (error) {
    return "";
  }
};
