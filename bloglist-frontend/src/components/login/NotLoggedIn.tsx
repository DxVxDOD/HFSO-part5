import Togglable, { VisibilityHandle } from "../Togglable.js";
import LoginForm from "./LoginForm.js";
import CreateUserForm from "../users/CreateUserForm.js";
import { useRef } from "react";
import "../../styles/loginPage.css";

const NotLoggedIn = () => {
  const signUpRef = useRef<VisibilityHandle>();

  return (
    <div className="log-in-field">
      <LoginForm />
      <Togglable buttonLabel="Sign up" ref={signUpRef}>
        <CreateUserForm signUpRef={signUpRef} />
      </Togglable>
    </div>
  );
};

export default NotLoggedIn;
