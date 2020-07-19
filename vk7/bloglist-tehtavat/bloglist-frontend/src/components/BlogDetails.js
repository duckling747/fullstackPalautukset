import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { showNote } from "../reducers/noteReducer";
import { messageClasses, loggedInKey } from "../App";
import Comments from "./Comments";

const BlogDetails = () => {

  const bloglist = useSelector(state => state.blogs);
  const id = useParams().id;
  const blog = bloglist.find(u => u.id === id);

  const dispatch = useDispatch();

  const history = useHistory();

  if(!blog || !blog.user) return null;

  const likeHandler = () => {
    dispatch(likeBlog(blog));
  };

  const isUsersBlog = () => {
    const loggedUserJSON = window.localStorage.getItem(loggedInKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (user.username === blog.user.username) return true;
    }
    return false;
  };

  const buttonStyle = { display: isUsersBlog() ? "" : "none" };

  const removeHandler = () => {
    if (!window.confirm("really remove?")) return;
    dispatch(deleteBlog(id));
    history.push("/blogs");
    dispatch(
      showNote(`blog ${blog.title} removed`, messageClasses.NOTIFICATION, 3));
  };

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={likeHandler}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button style={buttonStyle} onClick={removeHandler}>remove</button>
      <Comments comments={blog.comments} id={blog.id} />
    </>
  );
};

export default BlogDetails;
