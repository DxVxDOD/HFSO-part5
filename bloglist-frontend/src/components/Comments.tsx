import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useForm } from "../hooks/useForm";
import { createComment } from "../reducers/commentReducer";
import { AxiosError } from "axios";
import { dispalyError } from "../reducers/notificationReducer";
import { Button, TextField } from "@mui/material";

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
    <>
      <h2>Comments</h2>
      {comments.length < 1 ? (
        <span>Be the first to comment</span>
      ) : (
        <>
          <ul>
            {comments
              .filter((comment) => comment.blogId === blogId)
              .map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
          </ul>
        </>
      )}
      <form onSubmit={handleComment}>
        <TextField {...comment}
        variant='standard'
        label='Comment' />
        <Button variant='outlined' >comment</Button>
      </form>
    </>
  );
};

export default Comments;