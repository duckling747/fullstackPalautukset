import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userlistReducer";


const Users = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

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
                <td>{u.username}</td>
                <td>{u.blogs.length}</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

export default Users;
