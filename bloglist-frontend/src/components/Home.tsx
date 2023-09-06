import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import NotLoggedIn from "./login/NotLoggedIn";
import { BlogT } from "../types/blog";
import { Link, List, ListItem } from "@mui/material";

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
          <List>
            {[...blogs]
              .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
              .filter((blog: BlogT) => blog.user.username === user.username)
              .map((blog: BlogT) => (
                <ListItem key={blog.id}>
                  <Link to={`/blog/${blog.id}`} underline="hover" component={RouterLink} state={blog}>
                    {blog.title} by {blog.author}
                  </Link>
                </ListItem>
              ))}
          </List>
        </>
      )}
    </>
  );
};

export default Home;
