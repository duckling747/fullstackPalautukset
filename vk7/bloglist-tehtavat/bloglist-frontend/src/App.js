import React, { useState, useEffect, useRef } from "react";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { showNote } from "./reducers/noteReducer";
import { addBlog, initializeBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/userReducer";
import { Route, Switch, Link } from "react-router-dom";
import Users from "./components/UserList";
import UserDetails from "./components/UserDetails";
import { initializeUsers } from "./reducers/userlistReducer";
import BlogDetails from "./components/BlogDetails";

export const loggedInKey = "loggedBloglistUser";

export const messageClasses = {
  ERROR: "error",
  NOTIFICATION: "notification"
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlogFormRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedInKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        loggedInKey, JSON.stringify(user)
      );
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNote("wrong credentials", messageClasses.ERROR, 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInKey);
    dispatch(setUser(null));
    dispatch(showNote("logged out", messageClasses.NOTIFICATION, 3));
  };

  const handleCreateNewBlog = event => {
    event.preventDefault();
    const newBlog = { author, title, url };
    dispatch(addBlog(newBlog));
    createBlogFormRef.current.toggleVisible();
    dispatch(
      showNote(`a new blog ${newBlog.title} by ${newBlog.author} added!`,
        messageClasses.NOTIFICATION, 3));
  };

  const navbarStyle = {
    backgroundColor: "lightgrey"
  };

  const linkStyle = {
    padding: 5
  };

  if (user === null)
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username <input id="input_uname" type='text'
              value={username}
              name='Username'
              onChange={ ({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input id="input_pw" type='password'
              value={password}
              name='Password'
              onChange={ ({ target }) => setPassword(target.value)} />
          </div>
          <button id="login_button" type='submit'>login</button>
        </form>
      </div>
    );

  return (
    <div>
      <div style={navbarStyle}>
        <Link style={linkStyle} to="/">blogs</Link>
        <Link style={linkStyle} to="/users">users</Link>
        {user.name} ({user.username}) logged in {" "}
        <button id="logoutbutton" onClick={handleLogout}>log out</button>
      </div>
      <h1>blogs</h1>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <BlogDetails />
        </Route>
        <Route path="/users/:id">
          <UserDetails />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <BlogForm handleCreateNewBlog={handleCreateNewBlog}
            author={author} title={title} url={url}
            setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl}
            ref={createBlogFormRef}  />
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;