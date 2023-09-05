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

const Blog = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  console.log(state.user.username);

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
    <div className="blog">
      <h2>
        {state.title} {state.author}
      </h2>
      <a href={state.url}>{state.url}</a>
      <p>{state.user.username}</p>
      {user === null ? (
        <p id="likes">{state.likes}</p>
      ) : (
        <>
          <p>
            {state.likes}
            <button onClick={updateLikes} id="likeButton">
              like
            </button>
          </p>
          <button onClick={removeBlog}>remove</button>
        </>
      )}
    </div>
  );
};

export default Blog;
