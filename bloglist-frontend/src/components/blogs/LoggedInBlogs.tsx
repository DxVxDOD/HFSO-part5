import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import { BlogT } from "../../types/blog.js";
import { useRef } from "react";
import BlogsForm from "../blogs/BlogsForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import { Box, Button, Icon, List, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import blogList from "../../theme/BlogList.js";

const LoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);
  const user = useAppSelector((state) => state.user);

  const blogFormRef = useRef<VisibilityHandle>();
  const { classes } = blogList();

  return (
    <>
      <Box
        component="section"
        sx={{
          marginTop: "2rem",
          width: "100%",
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
              minWidth: "75%",
            }}
          >
            <Typography className={classes.h2} variant="h5" component="h2">
              {user.username} marks
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              component="nav"
            >
              {[...blogs]
                .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
                .filter((blog: BlogT) => blog.user.username === user.username)
                .map((blog: BlogT) => (
                  <Button
                    aria-label="button to access blogs"
                    sx={{
                      marginLeft: "2rem",
                    }}
                    key={blog.id}
                    component={RouterLink}
                    to={`/blog/${blog.id}`}
                    state={blog}
                  >
                    <Icon
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                      className={classes.icon}
                    >
                      <ArticleIcon fontSize="small" />
                    </Icon>
                    <Typography className={classes.listItem}>
                      {blog.title} by {blog.author}
                    </Typography>
                  </Button>
                ))}
            </Box>
          </Paper>
        )}
        <Paper
          sx={{
            display: "flex",
            padding: "1rem",
            width: "75%",
            flexDirection: "column",
          }}
        >
          <Typography className={classes.h2} variant="h5" component="h2">
            Other blogs
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            component="nav"
          >
            {[...blogs]
              .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
              .filter((blog: BlogT) => blog.user.username !== user.username)
              .map((blog: BlogT) => (
                <Button
                  aria-label="button to access blogs"
                  sx={{
                    marginLeft: "2rem",
                  }}
                  key={blog.id}
                  component={RouterLink}
                  to={`/blog/${blog.id}`}
                  state={blog}
                >
                  <Icon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    className={classes.icon}
                  >
                    <ArticleIcon fontSize="small" />
                  </Icon>
                  <Typography className={classes.listItem}>
                    {blog.title} by {blog.author}
                  </Typography>
                </Button>
              ))}
          </Box>
        </Paper>
      </Box>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm blogFormRef={blogFormRef} />
      </Togglable>
    </>
  );
};

export default LoggedInBlogs;
