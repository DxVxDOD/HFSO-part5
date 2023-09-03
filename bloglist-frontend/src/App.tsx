import React, { useState, useEffect, createContext } from "react";
import blogService from "./services/blog.ts";
import Notification from "./components/Notifications.tsx";
import LoggedIn from "./components/LoggedIn.tsx";
import NotLoggedIn from "./components/NotLoggedIn.tsx";
import { type BlogT } from "./types/blog.ts";

export const userContext = createContext(null);

const App = () => {
  const [blogs, setBlogs] = useState<BlogT[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
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
            blogs={blogs}
          />
        ) : (
          <LoggedIn
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        )}
      </div>
    </userContext.Provider>
  );
};

export default App;
