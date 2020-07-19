import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

import img from "../cat.jpg";// placeholder cat

const UserDetails = () => {

  const userlist = useSelector(state => state.userlist);
  const id = useParams().id;
  const user = userlist.find(u => u.id === id);

  if (!user) return null;
  return (
    <Card style={{ textAlign: "left" }}>
      <Card.Img variant="top" src={img} alt="cat photo" style={{ maxWidth: "25%" }} />
      <Card.Body>
        <Card.Title>{user.username} {user.name ? user.name : ""}</Card.Title>
        <Card.Subtitle>added blogs</Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        {user.blogs
          .filter(b => b)
          .map(b =>
            <ListGroup.Item variant="light" key={b.id}>{b.title}</ListGroup.Item>
          )}
      </ListGroup>
    </Card>
  );
};

export default UserDetails;
