import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import blogList from "../../theme/BlogList.js";

const NotLoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);
  const { classes } = blogList();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
      component="article"
    >
      {blogs.length < 1 ? (
        <section>
          <Typography>There are no blogs posted yet...</Typography>
        </section>
      ) : (
        <Paper
          sx={{
            padding: "2rem",
            minWidth: "75%",
            maxWidth: "75%",
            display: "flex",
            gap: "2rem",
            flexDirection: "column",
          }}
          component="section"
        >
          <Typography className={classes.h2} component="h3" variant="h5">
            Featured blogs
          </Typography>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {[...blogs]
              .sort((a, b) => b.likes! - a.likes!)
              .map((blog) => (
                <ListItemButton
                  className={classes.listItem}
                  key={blog.id}
                  component={RouterLink}
                  to={`/blog/${blog.id}`}
                  state={blog}
                >
                  <ListItemIcon>
                    <ArticleIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography>
                    {blog.title} by {blog.author}
                  </Typography>
                </ListItemButton>
              ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default NotLoggedInBlogs;
