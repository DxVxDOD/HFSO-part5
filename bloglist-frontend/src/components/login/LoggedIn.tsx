import { useRef } from "react";
import BlogsForm from "../blogs/BlogsForm.js";
import Togglable, { VisibilityHandle } from "../Togglable.js";
import { useAppSelector } from "../../app/hooks.js";

const LoggedIn = () => {

  const user = useAppSelector((state) => state.user);

  const blogFormRef = useRef<VisibilityHandle>();

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <p>{user.username} is logged in</p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogsForm blogFormRef={blogFormRef} />
      </Togglable>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default LoggedIn;
