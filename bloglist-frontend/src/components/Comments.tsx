import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useForm } from "../hooks/useForm";
import { createComment } from "../reducers/commentReducer";
import { AxiosError } from "axios";
import { dispalyError } from "../reducers/notificationReducer";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Button,
  FormControl,
  List,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Comments = ({ blogId }: { blogId: string }) => {
  const comments = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const { reset: resetComment, ...comment } = useForm("text");

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(
        createComment({
          content: comment.value,
          blogId: blogId,
        }),
      );
      resetComment();
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  return (
    <Paper
      component="aside"
      sx={{
        padding: "2rem",
        minWidth: '75%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography component="h3" variant="h6">
        Comments
      </Typography>
      {comments.length < 1 ? (
        <span>Be the first to comment</span>
      ) : (
        <>
          <List>
            {comments
              .filter((comment) => comment.blogId === blogId)
              .map((comment) => (
                <ListItemText key={comment.id}>{comment.content}</ListItemText>
              ))}
          </List>
        </>
      )}
      <FormControl sx={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column'
      }} component='form' onSubmit={handleComment}>
        <TextField
          {...comment}
          size="small"
          fullWidth
          variant="standard"
          label="Comment"
        />
        <Button
        sx={{
          width: 'fit-content'
        }}
          startIcon={<SendOutlinedIcon />}
          type="submit"
          size="small"
          variant="outlined"
        >
          Comment
        </Button>
      </FormControl>
    </Paper>
  );
};

export default Comments;
