import React, { FormEvent, useRef } from "react";
import BlogsForm from "../blogs/BlogsForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import Blog from "../blogs/Blogs.js";
import { BlogT } from "../../types/blog.js";
import { AxiosError } from "axios";
import { User } from "../../types/user.js";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { dispalyError } from "../../reducers/notificationReducer.js";
import { createBlog, initializeBlogs } from "../../reducers/blogReducer.js";

const LoggedIn = ({ user }: { user: User }) => {
  const blogFormRef = useRef<VisibilityHandle>();

  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state) => state.blog);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const handleNewBlog = async (
    e: FormEvent,
    newBlog: BlogT,
    setNewBlog: React.Dispatch<React.SetStateAction<BlogT>>,
  ) => {
    e.preventDefault();
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility();

      try {
        const blogObject = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
        };
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
    <div>
      <p>{user.name} is logged in</p>
      <ul>
        {blogs
          .filter((blog: BlogT) => blog.user)
          .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
          .map((blog: BlogT) => {
            if (blog.user!.username === user.username) {
              return (
                <li key={blog.id}>
                  <Blog blog={blog} />
                </li>
              );
            } else return <>You have not posted any blogs yet !</>;
          })}
      </ul>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm handleNewBlog={handleNewBlog} />
      </Togglable>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default LoggedIn;
