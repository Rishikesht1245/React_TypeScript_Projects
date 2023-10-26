import { auth } from "../firebase";
import { deleteLocalData } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import SymbolButton from "./UI/SymbolButton";
import toast from "react-hot-toast";

const Logout = ({ width }: { width: string }) => {
  const navigate = useNavigate();
  const handleLogout = (): void => {
    deleteLocalData();
    auth
      .signOut()
      .then(() => {
        toast.success("Sign out successful");
        navigate("/");
      })
      .catch((error) => {
        // Handle any sign-out errors if necessary
        console.error("Sign-out error:", error);
        toast.error("Error in Login");
      });
  };
  return (
    <SymbolButton
      text="Logout"
      color="black"
      action={"logout"}
      width={width}
      onClick={handleLogout}
    />
  );
};
export default Logout;
