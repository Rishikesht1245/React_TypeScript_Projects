import { db, collection } from "../firebase";
import { addDoc } from "firebase/firestore";

import toast from "react-hot-toast";

export const savePassword = async (
  email: string,
  newPassword: { name: string; password: string }
): Promise<void> => {
  const passwordCollection = collection(db, email);

  try {
    await addDoc(passwordCollection, newPassword);
    toast.success("Password saved");
  } catch (error) {
    console.log("error in add doc", error);
    toast.error("Please try again");
  }
};
