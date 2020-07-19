import blogsService from "../services/blogs";

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: "INIT_BLOGLIST",
      data: blogs
    });
  };
};

export const addBlog = (blogObject) => {
  return async dispatch => {
    await blogsService.create(blogObject);
    dispatch(initializeBlogs());
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes+1, user: blog.user.id };
    await blogsService.update(newBlog.id, newBlog);
    dispatch(initializeBlogs());
  };
};

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogsService.remove(id);
    dispatch({
      type: "REMOVE_BLOG",
      data: id
    });
  };
};

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await blogsService.comment(id, comment);
    dispatch({
      type: "COMMENT_BLOG",
      data: {
        id, comment
      }
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "INIT_BLOGLIST":
    return action.data;
  case "REMOVE_BLOG":
    return state.filter(b => b.id !== action.data);
  case "COMMENT_BLOG":
    return state.map(b => b.id !== action.data.id
      ? b
      : { ...b, comments: b.comments.concat(action.data.comment) }
    );
  default:
    return state;
  }
};

export default blogReducer;
