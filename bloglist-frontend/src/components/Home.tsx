import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { BlogT } from "../types/blog";
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

const Home = () => {
  const user = useAppSelector((state) => state.user);
  const blogs = useAppSelector((state) => state.blog);

  return (
    <Box
      sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          minWidth: "75%",
          padding: "2rem",
        }}
      >
        {user === null ? (
          <Typography>Proper home page</Typography>
        ) : (
          <>
            <article>
              <Typography component="h2" variant="h5">
                <strong> {user.username} is logged in</strong>
              </Typography>
              <Typography component="h3" variant="h6">
                My blogs:
              </Typography>
            </article>
            <List>
              {[...blogs]
                .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
                .filter((blog: BlogT) => blog.user.username === user.username)
                .map((blog: BlogT) => (
                  <ListItem key={blog.id}>
                    <ListItemButton
                      to={`/blog/${blog.id}`}
                      component={RouterLink}
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
      </Paper>
    </Box>
  );
};

export default Home;
