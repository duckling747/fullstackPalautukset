import React, { useState } from "react";
import blogs from "../services/blogs";
import { loggedInKey } from "../App";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "../reducers/blogsReducer";

const Blog = ({ blog, sendLikeHandlerProp }) => {

  const [detailed, setDetailed] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: detailed ? "" : "none"
  };

  const sendLike = async () => {
    const newBlog = { ...blog, likes: blog.likes+1, user: blog.user.id };
    await blogs.update(newBlog.id, newBlog);
    dispatch(initializeBlogs());
  };

  const removeBlog = async () => {
    if (!window.confirm("Really remove?")) return;
    //await blogs.remove(blog.id);
    //setBlogs(bloglist.filter(b => b !== blog));
    /*
    * TODO: use dispatch and redux for removing blog
    */
  };

  const isLoggedUsersBlog = () => {
    const loggedUserJSON = window.localStorage.getItem(loggedInKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (blog.user && blog.user.username === user.username) return true;
    }
    return false;
  };

  const toggleDetailed = () => {
    setDetailed(!detailed);
  };

  const isUsersBlogStyle = { display: isLoggedUsersBlog() ? "" : "none" };

  return (
    <div id="blog">
      <div style={blogStyle} className="togglableContent">
        {blog.title}; {blog.author} <br></br>
        {blog.url} <br></br>
      likes: {blog.likes} {" "}
        <button id="likebutton" onClick={ sendLikeHandlerProp || sendLike }>
          like
        </button> <br></br>
        {
          blog.user
            ? `${blog.user.username} (${blog.user.name})`
            : ""
        }
        {" "}
        <button id="hidebutton" onClick={ toggleDetailed }>hide</button> <br></br>
        <button id="removebutton" style={isUsersBlogStyle} onClick={removeBlog}>
        remove
        </button>
      </div>
      <div style={ { ...blogStyle, display: detailed ? "none" : "" } }
        className="defaultContent">
        {blog.title}; {blog.author} {" "}
        <button id="viewbutton" onClick={ toggleDetailed }>view</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  sendLikeHandlerProp: PropTypes.func
};

export default Blog;
