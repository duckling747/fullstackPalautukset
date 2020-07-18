import blogService from "../services/blogs";

export const setUser = (user) => {
  if (user) blogService.setToken(user.token);
  else blogService.setToken(null);
  return {
    type: "SET_USER",
    data: user
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
  case "SET_USER":
    return action.data;
  default:
    return state;
  }
};

export default userReducer;
