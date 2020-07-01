import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const loggedInKey = 'loggedBloglistUser'

const messageClasses = {
  ERROR: 'error',
  NOTIFICATION: 'notification'
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(messageClasses.NOTIFICATION)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedInKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        loggedInKey, JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // console.error('wrong credentials')
      setMessage('wrong credentials')
      setMessageClass(messageClasses.ERROR)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
  
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInKey)
    blogService.setToken(null)
    setUser(null)
    setMessage('logged out')
    setMessageClass(messageClasses.NOTIFICATION)
    setTimeout(() => {
      setMessage(null)
    }, 3000);
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = { author, title, url }
    const response = await blogService.create(newBlog)
    console.log(response)
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs)
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added!`)
    setMessageClass(messageClasses.NOTIFICATION)
    setTimeout(() => {
      setMessage(null)
    }, 3000);
  }

  if (user === null)
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} className={messageClass}/>
        <form onSubmit={handleLogin}>
          <div>
            username <input type='text' 
            value={username} 
            name='Username'
            onChange={ ({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type='password'
            value={password}
            name='Password'
            onChange={ ({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} className={messageClass} />
      <div>
        {user.name} ({user.username}) logged in {' '}
        <button onClick={handleLogout}>log out</button>
      </div>
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreateNewBlog}>
          <div>
            title:{' '}
            <input type='text' value={title} name='Title' 
            onChange={ ({ target }) => setTitle(target.value) } />
          </div>
          <div>
            author:{' '}
            <input type='text' value={author} name='Author' 
            onChange={ ({ target }) => setAuthor(target.value) } />  
          </div>
          <div>
            url:{' '}
            <input type='text' value={url} name='Url' 
            onChange={ ({ target }) => setUrl(target.value) } />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
      <h2>Bloglist</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App