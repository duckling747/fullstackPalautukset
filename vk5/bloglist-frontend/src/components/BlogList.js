import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
    return (
    <>
        <h2>Bloglist</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </>
    )
}

export default BlogList
