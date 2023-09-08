import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../types/user";
import { useEffect } from "react";
import { initializeUsers } from "../../reducers/userArrayReducer";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const UserInformation = () => {
  const users = useAppSelector((state) => state.userArray);
  const blogs = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <Paper sx={{
      padding: '1em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '2em',
      alignItems: 'center',
      margin: '2em',
    }} >
      <Typography component="h2" variant="h4">
        Users
      </Typography>
      <TableContainer sx={{
        width: '80%',
        position: 'relative'
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blog count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.username}>
                <TableCell>
                  <Button component={RouterLink} size="small" to={`/users/${user.id}`} state={{ user, blogs }}>
                    {user.username}
                  </Button>
                </TableCell>
                <TableCell>{user.blogs!.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserInformation;
