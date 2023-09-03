import React, { FormEvent, useState } from "react";
import loginService from "../services/login.ts";
import blogService from "../services/blog.ts";
import { AxiosError } from "axios";
import { useAppDispatch } from "../app/hooks.ts";
import { dispalyError } from "../reducers/notificationReducer.ts";

const LoginForm = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<null>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000))
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          id="username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
