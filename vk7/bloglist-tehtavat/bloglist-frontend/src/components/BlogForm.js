import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const BlogForm = React.forwardRef(
  ({ handleCreateNewBlog, setTitle, setAuthor, setUrl }, ref) => {

    const [createBlogVisible, setCreateBlogVisible] = useState(false);

    const hideWhenVisible = { display: createBlogVisible ? "none" : "" };
    const showWhenVisible = { display: createBlogVisible ? "" : "none" };

    const toggleVisible = () => {
      setCreateBlogVisible(!createBlogVisible);
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisible
      };
    });

    return (
      <>
        <div style={hideWhenVisible}>
          <Button id="visibilityButton" onClick={ toggleVisible }>
            create new blog
          </Button>
        </div>
        <div style={showWhenVisible}>
          <h2>create new blog</h2>
          <Form condensed="true" onSubmit={handleCreateNewBlog}>
            <Form.Group>
              <Form.Label>title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Label>author:</Form.Label>
              <Form.Control
                type="text"
                name="author"
                onChange={(event) => setAuthor(event.target.value)}
              />
              <Form.Label>url:</Form.Label>
              <Form.Control
                type="text"
                name="url"
                onChange={(event) => setUrl(event.target.value)}
              />
              <Button variant="primary" type="submit">
                create
              </Button>
              <Button style={{ marginLeft: 5 }}
                type="button" onClick={ toggleVisible }>
                cancel
              </Button>
            </Form.Group>
          </Form>
        </div>
      </>
    );
  });

BlogForm.displayName = "BlogForm";

BlogForm.propTypes = {
  handleCreateNewBlog: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired
};

export default BlogForm;
