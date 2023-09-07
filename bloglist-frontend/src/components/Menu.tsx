import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import "../styles/header.css";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useAppSelector } from "../app/hooks";

const Menu = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const user = useAppSelector((state) => state.user);

  return (
    <header className="header">
      <nav className="nav">
        <Button variant="outlined" component={RouterLink} to={"/blogs"}>
          Blogs
        </Button>
        {user === null ? null : (
          <Button variant="outlined" component={RouterLink} to={"/users"}>
            Users
          </Button>
        )}
        <Button variant="outlined" component={RouterLink} to={"/"}>
          Home
        </Button>
      </nav>
      <h1 className="logo">
        Blogs app
        <NewspaperIcon fontSize="large" />
      </h1>
      {user === null ? (
        <div className="bttn-container">
          <Button variant="outlined" color="success" component={RouterLink} to={"/login"} >
            Login
          </Button>
        </div>
      ) : (
        <div className="bttn-container">
          <Button
            size="small"
            className="log-out"
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Menu;
