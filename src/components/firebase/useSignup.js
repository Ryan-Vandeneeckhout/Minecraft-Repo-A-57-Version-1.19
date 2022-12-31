import { useState } from "react";
import { auth } from "../firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../firebase/useAuthContext.js";

export const useSignup = () => {
  //Sign up Page Logic Firebase
  const [error, setError] = useState(false);
  const { dispatch } = useAuthContext();
  const [success, setSuccess] = useState(null);

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        setSuccess((value) => !value);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setSuccess(false);
      });
  };

  return { error, signup, success };
};
