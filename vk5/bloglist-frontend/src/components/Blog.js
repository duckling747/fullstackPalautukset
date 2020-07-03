import React, { useState } from 'react'



const Blog = ({ blog }) => {

  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: detailed ? '' : 'none'
  }


  return (
  <>
    <div style={blogStyle}>
      {blog.title}; {blog.author} <br></br>
      {blog.url} <br></br>
      likes: {blog.likes} {' '} <button>like</button> <br></br>
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
  </>)
}

export default Blog
