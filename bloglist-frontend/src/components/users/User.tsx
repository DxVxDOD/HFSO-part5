import { Link as RouterLink, useLocation } from "react-router-dom";
import { BlogT } from "../../types/blog";
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

const User = () => {
  const { state } = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="article"
    >
      <Paper
        sx={{
          marginTop: "2rem",
          padding: "2rem",
          minWidth: "75%",
        }}
        component="section"
      >
        <Typography component="h2" variant="h5">
          {state.user.username}s blogs:
        </Typography>
        {state.blogs.length < 1 ? (
          <Typography component="h2" variant="h5">
            You haven't posted any blogs yet
          </Typography>
        ) : (
          <List>
            {state.blogs
              .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
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
                    {blog.title}
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default User;
