import { FormEvent, useState } from "react";
import { BlogT } from "../../types/blog";
import { useRef } from "react";
import { VisibilityHandle } from "../Togglable";
import { useAppDispatch } from "../../app/hooks";
import { createBlog, initializeBlogs } from "../../reducers/blogReducer";
import { AxiosError } from "axios";
import { dispalyError } from "../../reducers/notificationReducer";

const BlogsForm = () => {
  // Custom hook needs to be made
  const [newBlog, setNewBlog] = useState<BlogT>({
    author: "",
    title: "",
    url: "",
  });

  const blogFormRef = useRef<VisibilityHandle>();
  const dispatch = useAppDispatch();

  const handleNewBlog = async (e: FormEvent) => {
    e.preventDefault();
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();

      try {
        const blogObject = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
        };
        console.log(blogObject)
        dispatch(createBlog(blogObject));
        dispatch(initializeBlogs());
        setNewBlog({
          title: "",
          author: "",
          url: "",
        });
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          dispatch(dispalyError(exception.response.data.error, 5000));
        }
      }
    }
  };

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        Author
        <input
          type="text"
          name="Author"
          placeholder="Author"
          id="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        Title
        <input
          type="text"
          name="Title"
          placeholder="Title"
          id="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          name="Url"
          placeholder="Url"
          id="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button>Add blog</button>
    </form>
  );
};

export default BlogsForm;
