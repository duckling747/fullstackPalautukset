
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [userToken, setUserToken] = useState(null)

  const client = useApolloClient()


  useEffect(() => {
    setUserToken(window.localStorage.getItem('current-user-token'))
  }, [])

  const logoutHandler = () => {
    setUserToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const loggedInButtons = userToken !== null
  ? <>
    <button onClick={() => setPage('add')}>add book</button>
    <button onClick={logoutHandler}>logout</button>
  </>
  : null

  const loggedOutButtons = userToken === null
  ? <>
    <button onClick={() => setPage('login')}>login</button>
  </>
  : null

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loggedInButtons}
        {loggedOutButtons}
      </div>

      <Authors
        show={page === 'authors'}
        userToken={userToken}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setUserToken={setUserToken}
      />

    </div>
  )
}

export default App