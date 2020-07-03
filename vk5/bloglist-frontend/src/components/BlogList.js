import React from 'react'
import Blog from './Blog'

const comparator = (a, b) => {
    return -(a.likes - b.likes)
}

const BlogList = ({ blogs }) => {
    return (
    <>
        <h2>Bloglist</h2>
        {blogs
        .sort(comparator)
        .map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
    </>
    )
}

export default BlogList
