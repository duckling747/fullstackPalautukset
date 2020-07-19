import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogsReducer";
import { Button, Form, Table } from "react-bootstrap";

const Comments = ({ comments, id }) => {


  const [inputfield, setInputfield] = useState("");

  const dispatch = useDispatch();

  if (!comments) return null;

  const commentStyle = {
    fontFamily: "courierNew",
    fontSize: 13,
    marginTop: 20
  };

  const content = !comments.length
    ? <p style={commentStyle}>no comments yet...</p>
    : <Table responsive style={commentStyle}>
      <tbody>
        {comments.map((comment, i) =>
          <tr key={i}><td>{comment}</td></tr>
        )}
      </tbody>
    </Table>;


  const inputChangeHandler = ({ target }) => {
    setInputfield(target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(commentBlog(id, inputfield));
    setInputfield("");
  };


  return(
    <>
      <h3>comments</h3>
      <Form  style={{ textAlign: "left" }} onSubmit={submitHandler}>
        <Form.Control
          type="text"
          name="comment"
          onChange={inputChangeHandler}
          value={inputfield}
          placeholder="write your comment here..."
        />
        <Button type="submit">add comment</Button>
      </Form>
      {content}
    </>
  );

};

export default Comments;
