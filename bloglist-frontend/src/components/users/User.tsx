import { useLocation } from "react-router-dom";
import { BlogT } from "../../types/blog";

const User = () => {
  const { state } = useLocation();

  return (
    <>
      <h2>{state.username}s stats:</h2>
      <h3>Added blogs</h3>
      {state.blogs.length < 1 ? (
        <>You haven't posted any blogs yet</>
      ) : (
        state.blogs
          .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
          .map((blog: BlogT) => <li key={blog.id}>{blog.title}</li>)
      )}
    </>
  );
};

export default User;
