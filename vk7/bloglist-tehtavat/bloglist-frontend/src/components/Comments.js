import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentBlog } from "../reducers/blogsReducer";

const Comments = ({ comments, id }) => {


  const [inputfield, setInputfield] = useState("");

  const dispatch = useDispatch();

  if (!comments) return null;

  const content = !comments.length
    ? <p>no comments yet...</p>
    : <ul>
      {comments.map((comment, i) =>
        <li key={i}>{comment}</li>
      )}
    </ul>;


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
      <form onSubmit={submitHandler}>
        <input value={inputfield} onChange={inputChangeHandler} />
        <button type="submit">add comment</button>
      </form>
      {content}
    </>
  );

};

export default Comments;
