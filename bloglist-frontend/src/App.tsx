import { useEffect } from "react";
import blogService from "./services/blog.ts";
import Notification from "./components/Notifications.tsx";
import LoggedIn from "./components/login/LoggedIn.tsx";
import NotLoggedIn from "./components/login/NotLoggedIn.tsx";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import { initializeBlogs } from "./reducers/blogReducer.ts";
import { setUser } from "./reducers/userReducer.ts";

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggesUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggesUserJSON != null) {
      const user = JSON.parse(loggesUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification />
      {user === null ? <NotLoggedIn /> : <LoggedIn user={user} />}
    </div>
  );
};

export default App;
