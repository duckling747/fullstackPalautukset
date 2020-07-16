
const initialState = {
  text: "",
  messageclass: "notification"
};

let lastTimeout = null;

export const showNote = (note, messageclass, timeout) => {
  return async dispatch => {
    dispatch({
      type: "SHOW_NOTE",
      data: {
        text: note,
        messageclass: messageclass
      }
    });
    if (lastTimeout) clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => {
      dispatch({
        type: "SHOW_NOTE",
        data: {
          text: "",
          messageclass: messageclass
        }
      });
      lastTimeout = null;
    }, timeout * 1000); // timeout in seconds
  };
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
  case "SHOW_NOTE":
    return state = action.data;
  default:
    return state;
  }
};

export default noteReducer;
