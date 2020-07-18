import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import { useDispatch } from "react-redux";
import { showNote } from "./reducers/noteReducer";
import { initializeBlogs, addBlog } from "./reducers/blogsReducer";

export const loggedInKey = "loggedBloglistUser";

export const messageClasses = {
  ERROR: "error",
  NOTIFICATION: "notification"
};

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedInKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });
      window.localStorage.setItem(
        loggedInKey, JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showNote("wrong credentials", messageClasses.ERROR, 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInKey);
    blogService.setToken(null);
    setUser(null);
    dispatch(showNote("logged out", messageClasses.NOTIFICATION, 3));
  };

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = { author, title, url };
    dispatch(addBlog(newBlog));
    createBlogFormRef.current.toggleVisible();
    dispatch(
      showNote(`a new blog ${newBlog.title} by ${newBlog.author} added!`,
        messageClasses.NOTIFICATION, 3));
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
      <h1>blogs</h1>
      <Notification />
      <div>
        {user.name} ({user.username}) logged in {" "}
        <button id="logoutbutton" onClick={handleLogout}>log out</button>
      </div>
      <BlogForm handleCreateNewBlog={handleCreateNewBlog}
        author={author} title={title} url={url}
        setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl}
        ref={createBlogFormRef}  />
      <BlogList />
    </div>
  );
};

export default App;
