import Togglable from "../Togglable.js";
import LoginForm from "./LoginForm.js";
import Blog from "../blogs/Blogs.js";
import { useAppSelector } from "../../app/hooks.js";

const NotLoggedIn = () => {
  const blogs = useAppSelector((state) => state.blog);

  return (
    <>
      <Togglable buttonLabel="Login">
        <LoginForm />
      </Togglable>
      <ul>
        {blogs
          .sort((a, b) => b.likes! - a.likes!)
          .map((blog) => (
            <li key={blog.id}>
              <Blog blog={blog} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default NotLoggedIn;
