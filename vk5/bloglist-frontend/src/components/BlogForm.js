import React, { useState, useImperativeHandle } from 'react'

const BlogForm = React.forwardRef(
    ({ handleCreateNewBlog, title, author, url, 
    setTitle, setAuthor, setUrl }, ref) => {

    const [createBlogVisible, setCreateBlogVisible] = useState(false)

    const hideWhenVisible = { display: createBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    const toggleVisible = () => {
        setCreateBlogVisible(!createBlogVisible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })
    
    return (
    <>
        <div style={hideWhenVisible}>
            <button onClick={ toggleVisible }>
                create new blog
            </button>
        </div>
        <div style={showWhenVisible}>
            <h2>create new blog</h2>
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
            <button onClick={ toggleVisible }>
                cancel
            </button>
        </div>
    </>
    )
})

export default BlogForm
