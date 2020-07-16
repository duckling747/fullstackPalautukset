import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const comparator = (a, b) => {
  return b.likes - a.likes;
};

const BlogList = ({ blogs, setBlogs }) => {
  return (
    <div id="bloglist">
      <h2>Bloglist</h2>
      {blogs
        .sort(comparator)
        .map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} bloglist={blogs} />
        )}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
};

export default BlogList;
