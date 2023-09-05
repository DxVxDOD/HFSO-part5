import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import NotLoggedIn from "./login/NotLoggedIn";
import { BlogT } from "../types/blog";

const Home = () => {
  const user = useAppSelector((state) => state.user);
  const blogs = useAppSelector((state) => state.blog);

  return (
    <>
      {user === null ? (
        <NotLoggedIn />
      ) : (
        <>
          <p>{user.username} is logged in</p>
          <h3>My blogs</h3>
          <ul>
            {[...blogs]
              .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
              .filter((blog: BlogT) => blog.user.username === user.username)
              .map((blog: BlogT) => (
                <li key={blog.id}>
                  <Link to={`/blog/${blog.id}`} state={blog}>
                    {blog.title} by {blog.author}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Home;
