import { useRef, useState } from "react";
import { useLogin } from "../../components/firebase/useLogin.js";
import TextInput from "../../components/inputs/text/TextInput.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const { login, error, errorText, setError, success } = useLogin();

  const HandleSubmit = async (e) => {
    login(email, password);
    e.preventDefault();
  };

  return (
    <section className="loginSignupSection">
      <div className="adminLoginMenuWrapper">
        <div className="adminLoginContent">
          <div className="upperContent">
            <h2>Welcome Back Administrator</h2>
            <p>Log in to continue.</p>
            <p>{success}</p>
            {error ? <p>{errorText}</p> : null}
          </div>

          <div className="middleContent">
            <form
              className="textInputEmailPasswordForm"
              onSubmit={HandleSubmit}
            >
              <TextInput
                setError={setError}
                requiredInput={true}
                placeholderInput={"email..."}
                valueText={"Email"}
                InputType={"email"}
                setInputValue={setEmail}
                inputValue={email}
                InputRef={emailRef}
                ShowHideText={false}
              />
              <TextInput
                setError={setError}
                requiredInput={true}
                placeholderInput={"password..."}
                valueText={"Password"}
                InputType={"password"}
                setInputValue={setPassword}
                inputValue={password}
                InputRef={passwordRef}
                ShowHideText={true}
              />
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
