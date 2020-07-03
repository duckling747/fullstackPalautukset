import React, { useState } from 'react'
import blogs from '../services/blogs'



const Blog = ({ blog }) => {

  const [detailed, setDetailed] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: detailed ? '' : 'none'
  }

  const sendLike = async (blog) => {
    // const res = 
    await blogs.update(blog.id, 
      { ...blog, likes: blog.likes+1, user: blog.user.id })
    // console.log(res)
    setLikes(blog.likes+1)
  }

  return (
  <>
    <div style={blogStyle}>
      {blog.title}; {blog.author} <br></br>
      {blog.url} <br></br>
      likes: {likes} {' '}
      <button onClick={ () => sendLike(blog) }>like</button> <br></br>
      {
        blog.user
        ? `${blog.user.username} (${blog.user.name})`
        : ''
      }
      {' '}
      <button onClick={ () => setDetailed(false) }>hide</button>
    </div>
    <div style={ {...blogStyle, display: detailed ? 'none' : ''} }>
      {blog.title}; {blog.author} {' '}
      <button onClick={ () => setDetailed(true) }>view</button>
    </div>
  </>
  )
}

export default Blog
