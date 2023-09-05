import Togglable, { VisibilityHandle } from "../Togglable.js";
import LoginForm from "./LoginForm.js";
import CreateUserForm from "../users/CreateUserForm.js";
import { useRef } from "react";


const NotLoggedIn = () => {
  const signUpRef = useRef<VisibilityHandle>();

  return (
    <>
      <Togglable buttonLabel="Login">
        <LoginForm />
      </Togglable>
      <Togglable buttonLabel="Sign up" ref={signUpRef}>
        <CreateUserForm signUpRef={signUpRef} />
      </Togglable>
    </>
  );
};

export default NotLoggedIn;
