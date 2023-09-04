import { useAppSelector } from "../../app/hooks";
import { BlogT } from "../../types/blog";

const UserInformation = () => {
  const blogs = useAppSelector((state) => state.blog);

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
          {blogs.map((blog: BlogT) => (
            <tr key={blog.id}>
              <td>{blog.user?.name}</td>
              <td>{blog.user?.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            
        </tfoot>
      </table>
    </>
  );
};

export default UserInformation;
