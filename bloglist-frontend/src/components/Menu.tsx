import { Link } from "react-router-dom";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Link to={"/blogs"}>Blogs</Link>
      <Link to={"/users"}>Users</Link>
      <Link to={"/"}>Home</Link>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default Menu;
