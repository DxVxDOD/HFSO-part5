import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addUpdatedBlog,
  initializeBlogs,
  deleteBlog,
} from "../../reducers/blogReducer";
import { AxiosError } from "axios";
import {
  dispalyError,
  dispalySuccess,
} from "../../reducers/notificationReducer";
import { useLocation } from "react-router-dom";
import Comments from "../Comments";
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Blog = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const updateLikes = async () => {
    try {
      dispatch(addUpdatedBlog(state, state.id!));
      dispatch(initializeBlogs());
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  const removeBlog = async () => {
    if (state && window.confirm(`Would you like to remove ${state.title} ?`)) {
      try {
        dispatch(deleteBlog(state.id!));
        dispatch(dispalySuccess(`${state.title} has been removed`, 5000));
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          dispatch(dispalyError(exception.response.data.error, 5000));
        }
      }
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center'
    }} component="article">
      <Paper
        sx={{
          gap:'1rem',
          padding: "2rem",
          margin: "2rem",
          minWidth: '75%',
          display: "flex",
          flexDirection: "column",
        }}
        component="section"
      >
        <Box component='section' >
        <Typography component="h2" variant="h5">
          Title: {state.title} 
        </Typography>
        <Typography component='h3' variant="h6" >
        Author: {state.author}
        </Typography>
        </Box>
        <Link href={state.url}>{state.url}</Link>
        <Typography component="p">{state.user.username}</Typography>
        {user === null ? (
          <Typography component="p" id="likes">
            {state.likes}
          </Typography>
        ) : (
          <>
            {state.likes}
            <ButtonGroup aria-label="alignment button group" size="small" >
              <Button
              startIcon={<ThumbUpOutlinedIcon/>}
              aria-label="like button"                
                onClick={updateLikes}
                id="likeButton"
              >
                Like
              </Button>
              <Button
              aria-label="delete button"
              startIcon={<DeleteOutlinedIcon/>}
                onClick={removeBlog}
              >
                Remove
              </Button>
            </ButtonGroup>
          </>
        )}
      </Paper>
      <Comments blogId={`${state.id}`} />
    </Box>
  );
};

export default Blog;
