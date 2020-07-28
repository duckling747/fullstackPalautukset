
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [userToken, setUserToken] = useState(null)

  const client = useApolloClient()


  useEffect(() => {
    setUserToken(window.localStorage.getItem('current-user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(
        `new book added:
        author: ${book.author.name}
        title: ${book.title}
        published: ${book.published}`
      )
    }
  })

  const logoutHandler = () => {
    setUserToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  const loggedInButtons = userToken !== null
  ? <>
    <button onClick={() => setPage('add')}>add book</button>
    <button onClick={() => setPage('recommend')}>recommend</button>
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

      <Recommend
        show={page === 'recommend'}
        token={userToken}
      />

    </div>
  )
}

export default App