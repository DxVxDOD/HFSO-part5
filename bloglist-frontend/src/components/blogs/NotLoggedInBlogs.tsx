import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.js";
import ArticleIcon from "@mui/icons-material/Article";
import { Box, List, ListItem, ListItemButton, ListItemIcon, Paper, Typography } from "@mui/material";

const NotLoggedInBlogs = () => {
  const blogs = useAppSelector((state) => state.blog);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem'
    }} component='article' >
      {blogs.length < 1 ? (
        <section><Typography>There are no blogs posted yet...</Typography></section>
      ) : (
        <Paper sx={{
          padding: '2rem',
          minWidth: '75%'
        }} component='section' >
          <List>
            {[...blogs]
              .sort((a, b) => b.likes! - a.likes!)
              .map((blog) => (
                <ListItem key={blog.id}>
                  <ListItemButton component={RouterLink} to={`/blog/${blog.id}`} state={blog}>
                    <ListItemIcon>
                      <ArticleIcon/>
                    </ListItemIcon>
                    {blog.title} by {blog.author}
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default NotLoggedInBlogs;
