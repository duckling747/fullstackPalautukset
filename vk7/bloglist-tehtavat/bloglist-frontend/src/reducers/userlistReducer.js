import usersService from "../services/users";

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: "INIT_USERLIST",
      data: users
    });
  };
};

const userlistReducer = (state = [], action) => {
  switch(action.type) {
  case "INIT_USERLIST":
    return action.data;
  default:
    return state;
  }
};

export default userlistReducer;
