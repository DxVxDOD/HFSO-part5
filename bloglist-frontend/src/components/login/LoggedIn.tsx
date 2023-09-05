import { useRef } from "react";
import BlogsForm from "../blogs/BlogsForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import Blog from "../blogs/Blogs.js";
import { BlogT } from "../../types/blog.js";
import { useAppSelector } from "../../app/hooks.js";
import UserInformation from "../users/UserInformation.js";

const LoggedIn = () => {
  const blogs = useAppSelector((state) => state.blog);
  const user = useAppSelector((state) => state.user);

  const blogFormRef = useRef<VisibilityHandle>();

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <p>{user.username} is logged in</p>
      {blogs
        .filter((blog: BlogT) => blog.user)
        .sort((a: BlogT, b: BlogT) => b.likes! - a.likes!)
        .map((blog: BlogT) => {
          if (blog.user!.username === user.username) {
            return (
              <div key={blog.id}>
                <Blog blog={blog} />
              </div>
            );
          } else return <>You have not posted any blogs yet !</>;
        })}
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm blogFormRef={blogFormRef} />
      </Togglable>
      <button onClick={handleLogout}>Log out</button>
      <UserInformation />
    </>
  );
};

export default LoggedIn;
