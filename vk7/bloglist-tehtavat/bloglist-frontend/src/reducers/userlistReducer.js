import usersService from "../services/users";

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT",
      data: users
    });
  };
};

const userlistReducer = (state = [], action) => {
  switch(action.type) {
  case "INIT":
    return action.data;
  default:
    return state;
  }
};

export default userlistReducer;
