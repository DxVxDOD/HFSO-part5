import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import { BlogT } from "../../types/blog.js";
import { useRef } from "react";
import BlogsForm from "../blogs/BlogsForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

const LoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);
  const user = useAppSelector((state) => state.user);

  const blogFormRef = useRef<VisibilityHandle>();

  // need to fix liking of the blogs

  return (
    <Box component='section' >
      <List
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {blogs.length < 1 ? (
          <Typography component="h2" variant="h4">
            You haven't posted any blogs yet
          </Typography>
        ) : (
          <Paper
            sx={{
              padding: "1rem",
              minWidth: '75%',
            }}
          >
            <Typography variant="h5" component="h2">
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
          </Paper>
        )}
        <Paper
          sx={{
            padding: "1rem",
            minWidth: '75%'
          }}
        >
          <Typography variant="h5" component="h2">
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
        </Paper>
      </List>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm blogFormRef={blogFormRef} />
      </Togglable>
    </Box>
  );
};

export default LoggedInBlogs;
