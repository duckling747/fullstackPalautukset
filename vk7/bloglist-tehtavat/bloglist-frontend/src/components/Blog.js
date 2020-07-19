import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {


  return (
    <td>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </td>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
