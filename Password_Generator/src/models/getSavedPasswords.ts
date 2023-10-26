import { db, collection, getDocs } from "../firebase";
import { getLocalData } from "../utils/localStorage";
import { verifyToken } from "../utils/verifyToken";

export const getSavedPasswords = async (): Promise<any> => {
  const { email } = verifyToken(getLocalData());
  try {
    const querySnapshot = await getDocs(collection(db, email));
    //creating the passwords array from the data which we got from db
    const passwords = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return passwords;
  } catch (error) {
    console.log("Error in get saved passwords : ", error);
  }
};
