import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";

const NotLoggedInBlogs = () => {
  
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

export default NotLoggedInBlogs;
