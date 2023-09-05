import { useEffect } from "react";
import blogService from "./services/blog.ts";
import Notification from "./components/Notifications.tsx";
import LoggedIn from "./components/login/LoggedIn.tsx";
import NotLoggedIn from "./components/login/NotLoggedIn.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { initializeBlogs } from "./reducers/blogReducer.ts";
import { setUser } from "./reducers/userReducer.ts";
import { initializeUsers } from "./reducers/userArrayReducer.ts";
import { Route, Routes } from "react-router-dom";
import UserInformation from "./components/users/UserInformation.tsx";
import User from "./components/users/User.tsx";

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggesUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggesUserJSON !== null) {
      const loggedUser = JSON.parse(loggesUserJSON);
      blogService.setToken(loggedUser.token);
      dispatch(initializeUsers());
      dispatch(setUser(loggedUser));
    }
  }, []);

  return (
    <>
      <h1>Blogs app</h1>
      <Notification />
      {user === null ? <NotLoggedIn /> : <LoggedIn />}
      <Routes>
        <Route path="users/:id" element={<User />} />
        <Route path="/" element={<UserInformation />} />
      </Routes>
    </>
  );
};

export default App;
