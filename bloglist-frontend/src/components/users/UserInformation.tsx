import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "../../types/user";
import { useEffect } from "react";
import { initializeUsers } from "../../reducers/userArrayReducer";

const UserInformation = () => {
  const users = useAppSelector((state) => state.userArray);
  const blogs = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blog count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`} state={{ user, blogs }}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs!.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserInformation;
