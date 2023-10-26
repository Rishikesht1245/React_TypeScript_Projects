import { verifyToken } from "../utils/verifyToken";
import { getLocalData } from "../utils/localStorage";
import { db, doc, deleteDoc } from "../firebase";

export const deletePassword = async (id: string): Promise<void> => {
  try {
    const { email } = verifyToken(getLocalData());
    await deleteDoc(doc(db, email, id));
  } catch (error) {
    console.log("Error in delete password :", error);
    throw error;
  }
};
