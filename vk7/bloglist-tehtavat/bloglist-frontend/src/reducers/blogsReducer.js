import blogsService from "../services/blogs";

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: "INIT",
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

export const deleteBlog = () => {

};

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "INIT":
    return action.data;
  default:
    return state;
  }
};

export default blogReducer;
