import Togglable from "./Togglable.tsx";
import LoginForm from "./LoginForm.tsx";
import Blog from "./Blogs.tsx";
import { BlogT } from "../types/blog.ts";

const NotLoggedIn = ({
  setUser,
  blogs,
}: {
  setUser: React.Dispatch<React.SetStateAction<null>>;
  blogs: BlogT[];
}) => {
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
