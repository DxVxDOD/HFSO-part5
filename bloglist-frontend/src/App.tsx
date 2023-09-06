import { useEffect } from "react";
import blogService from "./services/blog.ts";
import Notification from "./components/Notifications.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { initializeBlogs } from "./reducers/blogReducer.ts";
import { setUser } from "./reducers/userReducer.ts";
import { initializeUsers } from "./reducers/userArrayReducer.ts";
import { Route, Routes } from "react-router-dom";
import User from "./components/users/User.tsx";
import Blog from "./components/blogs/Blogs.tsx";
import NotLoggedInBlogs from "./components/blogs/NotLoggedInBlogs.tsx";
import LoggedInBlogs from "./components/blogs/LoggedInBlogs.tsx";
import Menu from "./components/Menu.tsx";
import UserInformation from "./components/users/UserInformation.tsx";
import Home from "./components/Home.tsx";
import { initializeComments } from "./reducers/commentReducer.ts";

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeComments())
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
      <Menu />
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserInformation />} />
        {user === null ? (
          <>
            <Route path="/blogs" element={<NotLoggedInBlogs />} />
          </>
        ) : (
          <Route path="/blogs" element={<LoggedInBlogs />} />
        )}
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;
