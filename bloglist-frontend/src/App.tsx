import { useState, useEffect, createContext } from "react";
import blogService from "./services/blog.ts";
import Notification from "./components/Notifications.tsx";
import LoggedIn from "./components/login/LoggedIn.tsx";
import NotLoggedIn from "./components/login/NotLoggedIn.tsx";
import { useAppDispatch } from "./app/hooks.ts";
import { initializeBlogs } from "./reducers/blogReducer.ts";

export const userContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    const loggesUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggesUserJSON != null) {
      const user = JSON.parse(loggesUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <userContext.Provider value={user}>
      <div>
        <h1>Blogs app</h1>
        <Notification />
        {user === null ? (
          <NotLoggedIn
            setUser={setUser}
          />
        ) : (
          <LoggedIn
            user={user}
          />
        )}
      </div>
    </userContext.Provider>
  );
};

export default App;
