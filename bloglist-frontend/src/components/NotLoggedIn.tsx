import Togglable from "./Togglable.tsx";
import LoginForm from "./LoginForm.tsx";
import Blog from "./Blogs.tsx";
import { BlogT } from "../types/blog.ts";

const NotLoggedIn = ({
  setMessage,
  setMessageType,
  setUser,
  blogs,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setMessageType: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  blogs: BlogT[];
}) => {
  return (
    <>
      <Togglable buttonLabel="Login">
        <LoginForm
          setMessage={setMessage}
          setMessageType={setMessageType}
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
