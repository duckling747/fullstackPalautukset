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
import { Button, Form, Navbar, Nav } from "react-bootstrap";

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

  const mainDivStyle = {
    opacity: 0.9,
    backgroundSize: "cover",
    fontFamily: "serif",
    textAlign: "center"
  };

  if (user === null)
    return (
      <div className="container" style={mainDivStyle}>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <Form.Group>
            <Form.Label>
              username:
            </Form.Label>
            <Form.Control
              id="input_uname"
              type="text"
              name="Username"
              onChange={ ({ target }) => setUsername(target.value)}
            />
            <Form.Label>
              password:
            </Form.Label>
            <Form.Control
              id="input_pw"
              type="password"
              name="Password"
              onChange={ ({ target }) => setPassword(target.value)}
            />
            <Button id="login_button" type='submit'>login</Button>
          </Form.Group>
        </Form>
      </div>
    );

  const headerStyle = {
    fontSize: 80,
    color: "dodgerBlue",
    margin: "auto",
  };

  return (
    <div className="container" style={mainDivStyle}>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navclass">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Navbar.Text>
              {user.name} ({user.username}) logged in
            </Navbar.Text>
          </Nav>
          <Button style={{ marginLeft: 10 }} id="logoutbutton" onClick={handleLogout}>
              log out
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <h1 style={headerStyle}>~~~~ Blogs ~~~~</h1>
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
            setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl}
            ref={createBlogFormRef}  />
          <BlogList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
