import Togglable from "../Togglable.js";
import LoginForm from "./LoginForm.js";
import Blog from "../blogs/Blogs.js";
import { useAppSelector } from "../../app/hooks.js";
import CreateUserForm from "../users/CreateUserForm.js";

const NotLoggedIn = () => {
  const blogs = useAppSelector((state) => state.blog);

  return (
    <>
      {blogs.length < 1 ? (
        <div>There are no blogs posted yet...</div>
      ) : (
        <>
          <ul>
            {[...blogs]
              .sort((a, b) => b.likes! - a.likes!)
              .map((blog) => (
                <li key={blog.id}>
                  <Blog blog={blog} />
                </li>
              ))}
          </ul>
        </>
      )}
      <Togglable buttonLabel="Login">
        <LoginForm />
      </Togglable>
      <Togglable buttonLabel="Sign up">
        <CreateUserForm />
      </Togglable>
    </>
  );
};

export default NotLoggedIn;
