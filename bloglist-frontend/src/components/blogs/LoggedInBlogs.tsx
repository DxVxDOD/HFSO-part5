import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import { BlogT } from "../../types/blog.js";
import { useRef } from "react";
import BlogsForm from "../blogs/BlogsForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const LoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);
  const user = useAppSelector((state) => state.user);

  const blogFormRef = useRef<VisibilityHandle>();

  // need to fix liking of the blogs

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="logged-in-blogs"
    >
      {blogs.length < 1 ? (
        <>You haven't posted any blogs yet</>
      ) : (
        <>
          <Typography variant="h4" component="h2">
            {user.username}s blogs
          </Typography>
          <List>
            {[...blogs]
              .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
              .filter((blog: BlogT) => blog.user.username === user.username)
              .map((blog: BlogT) => (
                <ListItem key={blog.id}>
                  <ListItemButton
                    component={RouterLink}
                    to={`/blog/${blog.id}`}
                    state={blog}
                  >
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    {blog.title} by {blog.author}
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </>
      )}
      <Typography variant="h4" component="h2">
        Other blogs
      </Typography>
      <List>
        {[...blogs]
          .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
          .filter((blog: BlogT) => blog.user.username !== user.username)
          .map((blog: BlogT) => (
            <ListItem key={blog.id}>
              <ListItemButton
                component={RouterLink}
                to={`/blog/${blog.id}`}
                state={blog}
              >
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                {blog.title} by {blog.author}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm blogFormRef={blogFormRef} />
      </Togglable>
    </List>
  );
};

export default LoggedInBlogs;
