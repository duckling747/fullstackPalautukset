import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, GENRE_BOOKS, BOOK_ADDED } from '../queries'
import Booklist from './Booklist'

const Recommend = (props) => {


    const resultME = useQuery(ME, {
        fetchPolicy: 'cache-first'
    })

    const me = resultME?.data?.me
    
    const resultGenres = useQuery(GENRE_BOOKS, {
        skip: !me,
        variables: {
            genre: me && me.favoriteGenre
        },
        fetchPolicy: 'no-cache'
    })

    resultGenres.subscribeToMore({
        document: BOOK_ADDED,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const newBook
            = subscriptionData.data.bookAdded
          if (!me || !newBook.genres.includes(me.favoriteGenre))
            return prev

          return {
            ...prev,
            allBooks: [ newBook, ...prev.allBooks ]
          }
        }
      })

    if (!props.show) return null

    if (resultME.loading || resultGenres.loading)
        return <>loading...</>

    const books = resultGenres.data.allBooks

    return(
        <>
            <h2>recommendations</h2>
            {
              `Greetings ${me.username}, \
              here are books in your favorite genre, ${me.favoriteGenre}:`
            }
            <div>
              <Booklist books={books} />
            </div>
        </>
    )
}

export default Recommend
