import { Link, useLocation } from "react-router-dom";
import { BlogT } from "../../types/blog";
import { Typography } from "@mui/material";

const User = () => {
  const { state } = useLocation();
  console.log(state)

  return (
    <>
      <Typography component="h2" variant="h5">
        {state.user.username}s stats:
      </Typography>
      <Typography component='h3' variant="h6" >
      Added blogs
      </Typography>
      {state.blogs.length < 1 ? (
        <>You haven't posted any blogs yet</>
      ) : (
        state.blogs
          .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
          .map((blog: BlogT) => (
            <li key={blog.id}>
              <Link to={`/blog/${blog.id}`} state={blog}>
                {blog.title}
              </Link>
            </li>
          ))
      )}
    </>
  );
};

export default User;
