import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetails = () => {

  const userlist = useSelector(state => state.userlist);
  const id = useParams().id;
  const user = userlist.find(u => u.id === id);

  if (!user) return null;
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs
          .filter(b => b)
          .map(b =>
            <li key={b.id}>{b.title}</li>
          )}
      </ul>
    </>
  );
};

export default UserDetails;
