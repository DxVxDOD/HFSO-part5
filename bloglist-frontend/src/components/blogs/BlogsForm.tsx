import { FormEvent } from "react";
import { VisibilityHandle } from "../Togglable";
import { useAppDispatch } from "../../app/hooks";
import { createBlog, initializeBlogs } from "../../reducers/blogReducer";
import { AxiosError } from "axios";
import { dispalyError } from "../../reducers/notificationReducer";
import { useForm } from "../../hooks/useForm";
import { Button, Paper, Stack, TextField } from "@mui/material";

const BlogsForm = ({
  blogFormRef,
}: {
  blogFormRef: React.MutableRefObject<VisibilityHandle | undefined>;
}) => {
  const { reset: resetAuthor, ...author } = useForm("text");
  const { reset: resetTitle, ...title } = useForm("text");
  const { reset: resetUrl, ...url } = useForm("text");

  const dispatch = useAppDispatch();

  const handleNewBlog = async (e: FormEvent) => {
    e.preventDefault();

    blogFormRef.current?.toggleVisibility();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      dispatch(createBlog(blogObject));
      dispatch(initializeBlogs());
      resetAuthor();
      resetTitle();
      resetUrl();
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  return (
    <Paper sx={{
      padding: '2em'
    }} >
      <form onSubmit={handleNewBlog}>
        <Stack direction="column" spacing={2}>
          <TextField
            required
            size="small"
            label="Author"
            variant="standard"
            placeholder="Author"
            color="success"
            {...author}
          />
          <TextField
            color="success"
            required
            size="small"
            label="Title"
            variant="standard"
            placeholder="Title"
            {...title}
          />
          <TextField
            required
            color="success"
            size="small"
            label="Url"
            variant="standard"
            placeholder="Url"
            {...url}
          />
        </Stack>
        <Button type="submit" color="success" variant="outlined" size="small">
          Add blog
        </Button>
      </form>
    </Paper>
  );
};

export default BlogsForm;
