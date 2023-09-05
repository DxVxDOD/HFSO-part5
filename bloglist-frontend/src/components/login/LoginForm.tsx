import { FormEvent } from "react";
import loginService from "../../services/login.js";
import blogService from "../../services/blog.js";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../app/hooks.js";
import { dispalyError } from "../../reducers/notificationReducer.js";
import { setUser } from "../../reducers/userReducer.js";
import { useForm } from "../../hooks/useForm.js";

const LoginForm = () => {
  const { reset: usernameReset, ...username } = useForm("text");
  const { reset: passwordReset, ...password } = useForm("text");

  const dispatch = useAppDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      usernameReset();
      passwordReset();
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input {...username} />
      </div>
      <div>
        Password
        <input {...password} />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
