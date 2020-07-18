import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import noteReducer from "./reducers/noteReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import userlistReducer from "./reducers/userlistReducer";

const reducer = combineReducers({
  notes: noteReducer,
  blogs: blogsReducer,
  user: userReducer,
  userlist: userlistReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;
