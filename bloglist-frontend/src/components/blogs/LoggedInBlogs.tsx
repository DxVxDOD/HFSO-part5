import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import { BlogT } from "../../types/blog.js";

const LoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);
  const user = useAppSelector((state) => state.user);

  return (
    <>
      {blogs.length < 1 ? (
        <>You haven't posted any blogs yet</>
      ) : (
        <>
          <h2>{user.username}s blogs</h2>
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
      <h2>Other blogs</h2>
      {[...blogs]
        .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
        .filter((blog: BlogT) => blog.user.username !== user.username)
        .map((blog: BlogT) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`} state={blog}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
    </>
  );
};

export default LoggedInBlogs;
