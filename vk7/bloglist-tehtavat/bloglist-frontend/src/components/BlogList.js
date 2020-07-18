import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const comparator = (a, b) => {
  return b.likes - a.likes;
};

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);

  return (
    <div id="bloglist">
      <h2>Bloglist</h2>
      {blogs
        .sort(comparator)
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  );
};

export default BlogList;
