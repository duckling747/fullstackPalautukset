import React from "react";
import Blog from "./Blog";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const comparator = (a, b) => {
  return b.likes - a.likes;
};

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);

  if (!blogs) return null;
  return (
    <div style={{ marginTop: 10 }} id="bloglist">
      <h2>Bloglist</h2>
      <Table condensed="true" hover responsive >
        <tbody>
          {blogs
            .sort(comparator)
            .map(blog =>
              <tr key={blog.id}>
                <Blog blog={blog} />
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
