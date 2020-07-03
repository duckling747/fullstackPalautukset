import React from 'react'

const BlogForm = 
({ handleCreateNewBlog, title, author, url, 
    setTitle, setAuthor, setUrl, 
    createBlogVisible, setCreateBlogVisible }) => {

    const hideWhenVisible = { display: createBlogVisible ? 'none' : ''}
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    
    return (
    <>
        <div style={hideWhenVisible}>
            <button onClick={ () => setCreateBlogVisible(true) }>
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
            <button onClick={ () => setCreateBlogVisible(false) }>
                cancel
            </button>
        </div>
    </>
    )
}

export default BlogForm
