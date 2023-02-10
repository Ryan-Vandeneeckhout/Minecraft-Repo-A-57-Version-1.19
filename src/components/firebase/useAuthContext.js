import { AuthContext } from "../../context/AuthContext.js";
import { useContext } from "react";

export const useAuthContext = () => {
  // Authicate if the user is signed in Firebase //
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
