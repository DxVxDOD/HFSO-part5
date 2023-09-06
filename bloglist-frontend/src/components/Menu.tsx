import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import {Button} from "@mui/material";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Link component={RouterLink} underline="hover" to={"/blogs"}>Blogs</Link>
      <Link component={RouterLink} underline="hover" to={"/users"}>Users</Link>
      <Link component={RouterLink} underline="hover"  to={"/"}>Home</Link>
      <Button variant="outlined" color="error" onClick={handleLogout}>Log out</Button>
    </>
  );
};

export default Menu;
