import React, { useState } from 'react'
import blogs from '../services/blogs'



const Blog = ({ blog }) => {

  const [detailed, setDetailed] = useState(false)
  const [s_blog, setBlog] = useState(
    { ...blog }
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: detailed ? '' : 'none'
  }

  const sendLike = async () => {
    // const res = 
    const newBlog = { ...s_blog, likes: s_blog.likes+1, user: s_blog.user.id }
    await blogs.update(newBlog.id, newBlog)
    setBlog(
    {
      ...s_blog,
      likes: s_blog.likes+1,
      user: { ...s_blog.user }
    }
    )
  }

  return (
  <>
    <div style={blogStyle}>
      {s_blog.title}; {s_blog.author} <br></br>
      {s_blog.url} <br></br>
      likes: {s_blog.likes} {' '}
      <button onClick={ () => sendLike() }>like</button> <br></br>
      {
        blog.user
        ? `${s_blog.user.username} (${s_blog.user.name})`
        : ''
      }
      {' '}
      <button onClick={ () => setDetailed(false) }>hide</button>
    </div>
    <div style={ {...blogStyle, display: detailed ? 'none' : ''} }>
      {s_blog.title}; {s_blog.author} {' '}
      <button onClick={ () => setDetailed(true) }>view</button>
    </div>
  </>
  )
}

export default Blog
