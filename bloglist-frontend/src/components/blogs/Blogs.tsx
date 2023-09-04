import { useState } from "react";
import { BlogT } from "../../types/blog";
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

const Blog = ({ blog }: { blog: BlogT }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visibility, setVisibility] = useState(false);
  const toggleVisibility = () => setVisibility(!visibility);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const updateLikes = async () => {
    try {
      dispatch(addUpdatedBlog(blog, blog.id!));
      dispatch(initializeBlogs());
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        dispatch(dispalyError(exception.response.data.error, 5000));
      }
    }
  };

  const removeBlog = async () => {
    if (blog && window.confirm(`Would you like to remove ${blog.title} ?`)) {
      try {
        dispatch(deleteBlog(blog.id!));
        dispatch(dispalySuccess(`${blog.title} has been removed`, 5000));
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          dispatch(dispalyError(exception.response.data.error, 5000));
        }
      }
    }
  };

  return (
    <div className="blog">
      {visibility ? (
        <div style={blogStyle}>
          {user === null ? (
            <>
              <p>
                {blog.title} {blog.author}
              </p>
              <a href={blog.url}>{blog.url}</a>
              <p id="likes">{blog.likes}</p>
              <p>
                {blog.likes}
                <button onClick={updateLikes}>like</button>
              </p>
              <p>{blog.user!.name}</p>
              <button onClick={toggleVisibility}>hide</button>
            </>
          ) : (
            <>
              <p>
                {blog.title} {blog.author}
              </p>
              <a href={blog.url}>{blog.url}</a>
              <p>
                {blog.likes}
                <button onClick={updateLikes} id="likeButton">
                  like
                </button>
              </p>
              <p>{blog.user!.name}</p>
              <button onClick={removeBlog}>remove</button>
              <button onClick={toggleVisibility}>hide</button>
            </>
          )}
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
