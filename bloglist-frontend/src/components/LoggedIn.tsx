import React, { FormEvent, useRef } from "react";
import BlogsForm from "./BlogsForm.tsx";
import Togglable, { VisibilityHandle } from "./Togglable.tsx";
import Blog from "./Blogs.tsx";
import blogService from "../services/blog.ts";
import { BlogT } from "../types/blog.ts";
import { AxiosError } from "axios";
import { User } from "../types/user.ts";

const LoggedIn = ({
  user,
  blogs,
  setBlogs,
  setMessageType,
  setMessage,
}: {
  user: User;
  blogs: BlogT[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogT[]>>;
  setMessageType: React.Dispatch<React.SetStateAction<string | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const blogFormRef = useRef<VisibilityHandle>();

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
        const response = await blogService.create(blogObject);
        const result = await blogService.getAll();
        setBlogs(result);
        setMessageType("success");
        setMessage(`New blog: ${response.title} by ${response.author}`);
        setTimeout(() => {
          setMessageType("");
        }, 5000);
        setNewBlog({
          title: "",
          author: "",
          url: "",
        });
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          setMessageType("error");
          setMessage(exception.response.data.error);
          setTimeout(() => {
            setMessageType("");
          }, 5000);
        }
      }
    }
  };

  const updateLikes = async (id: string) => {
    const blog = blogs.find((blog: BlogT) => blog.id === id);
    if (blog) {
      const chnagedBlog = { ...blog, likes: blog.likes! + 1 };

      try {
        const returnedNote = await blogService.update(id, chnagedBlog);
        await blogService.getAll().then((blogs) => setBlogs(blogs));
        setMessageType("success");
        setMessage(`${returnedNote.title} has been updated`);
        setTimeout(() => {
          setMessageType("");
        }, 5000);
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          setMessageType("error");
          setMessage(exception.response.data.error);
          setTimeout(() => {
            setMessageType("");
          }, 5000);
        }
      }
    }
  };

  const removeBlog = async (id: string) => {
    const blog = blogs.find((blog: BlogT) => blog.id === id);

    if (blog && window.confirm(`Would you like to remove ${blog.title} ?`)) {
      try {
        await blogService.remove(id);
        await blogService.getAll().then((blogs) => setBlogs(blogs));
        setMessageType("success");
        setMessage(`${blog.title} has been removed`);
        setTimeout(() => {
          setMessageType("");
        }, 5000);
      } catch (exception: unknown) {
        if (exception instanceof AxiosError && exception.response) {
          setMessageType("error");
          setMessage(exception.response.data.error);
          setTimeout(() => {
            setMessageType("");
          }, 5000);
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
                  <Blog
                    blog={blog}
                    updateLikes={() => updateLikes(blog.id!)}
                    removeBlog={() => removeBlog(blog.id!)}
                  />
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
