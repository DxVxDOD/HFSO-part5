import Togglable from "../Togglable.js";
import LoginForm from "./LoginForm.js";
import Blog from "../blogs/Blogs.js";
import { BlogT } from "../../types/blog.js";
import { useAppSelector } from "../../app/hooks.js";

const NotLoggedIn = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<null>>;
}) => {

  const blogs = useAppSelector(state => state.blog)

  return (
    <>
      <Togglable buttonLabel="Login">
        <LoginForm
          setUser={setUser}
        />
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
