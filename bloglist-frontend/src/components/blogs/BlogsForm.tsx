import { FormEvent } from "react";
import { VisibilityHandle } from "../Togglable";
import { useAppDispatch } from "../../app/hooks";
import { createBlog, initializeBlogs } from "../../reducers/blogReducer";
import { AxiosError } from "axios";
import { dispalyError } from "../../reducers/notificationReducer";
import { useForm } from "../../hooks/useForm";

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
    <form onSubmit={handleNewBlog}>
      <div>
        Author
        <input {...author} />
      </div>
      <div>
        Title
        <input {...title} />
      </div>
      <div>
        Url:
        <input {...url} />
      </div>
      <button>Add blog</button>
    </form>
  );
};

export default BlogsForm;
