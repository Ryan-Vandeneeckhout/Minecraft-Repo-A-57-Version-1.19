import { useState } from "react";
import { auth } from "./config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext.js";

export const useLogin = () => {
  //Login Page Logic Firebase Auth
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [success, setSuccess] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    setSuccess(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        setSuccess(true);
        
      })
      .catch((err) => {
        setError(true);
        setErrorText(err.message);

        if (err.message === "Firebase: Error (auth/invalid-email).") {
          setErrorText("Please check your email again!");
          }
          
          if (err.message === "Firebase: Error (auth/user-not-found).") {
            setErrorText("User not found please check your email again!");
          }
      });
  };

  return { error, login, success, errorText, setError };
};
