import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const UserList = () => {

  const users = useSelector(state => state.userlist);

  const style = {
    textAlign: "center"
  };

  return(
    <>
      <h2>Users</h2>
      <table style={style}>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(u => u.username)
            .map(u =>
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>
                    {u.username}
                  </Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
