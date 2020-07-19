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

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "INIT_BLOGLIST":
    return action.data;
  case "REMOVE_BLOG":
    return state.filter(b => b.id !== action.data);
  default:
    return state;
  }
};

export default blogReducer;