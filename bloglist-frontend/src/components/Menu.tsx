import { Link as RouterLink } from "react-router-dom";
import { Box, Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material";
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
    <Paper component='header' sx={{
      display: 'flex',
      bgcolor: 'ghostwhite',
      alignItems: 'center',
      padding: '0.5em',
      flexDirection: 'row',
      marginBottom: '1em,'
    }}>
      <nav className="nav">
        <Stack direction='column' >
          <ButtonGroup variant="outlined" aria-label="alignment button group" >
            <Button component={RouterLink} to={"/blogs"}>
              Blogs
            </Button>
            {user === null ? null : (
              <Button component={RouterLink} to={"/users"}>
                Users
              </Button>
            )}
            <Button component={RouterLink} to={"/"}>
              Home
            </Button>
          </ButtonGroup>
        </Stack>
      </nav>
      <Typography color='black' className="logo" variant="h3" component="h1">
        Blogs app
        <NewspaperIcon fontSize="large" />
      </Typography>
      {user === null ? (
        <Box className="bttn-container">
          <Button
            variant="outlined"
            color="success"
            component={RouterLink}
            to={"/login"}
          >
            Login
          </Button>
        </Box>
      ) : (
        <Box className="bttn-container">
          <Button
            size="small"
            className="log-out"
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Menu;
