import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GENRES, GENRE_BOOKS, BOOK_ADDED } from '../queries'
import Booklist from './Booklist'

const Books = (props) => {

  const resultGenres = useQuery(GENRES)

  const [genre, setGenre] = useState('')

  /*
  * Huom. Saattaisi olla järkevämpää tehdä vain yksi
  * useQuery, jota sitten päivitettäisiin subscriptioilla ja
  * filtteröitäisiin clientissä, mutta koska aikaisemmassa
  * tehtävässä haluttiin, että tehdään filtteröinti palvelimella,
  * niin annetaan tämän nyt olla 'no-cache' ja *joka paikassa* tuo
  * subscribeToMore. 
  */
  const [loadBooks, result] = useLazyQuery(GENRE_BOOKS, {
    fetchPolicy: 'no-cache'
  })

  resultGenres.subscribeToMore({
    document: BOOK_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev
      const origGenres
      = [...new Set(prev
        .allBooks
        .flatMap(b => b.genres))]
      const genres
        = subscriptionData.data.bookAdded.genres
          .filter(g => !origGenres.includes(g))
      if (!genres.length) return prev
      return {
        ...prev,
        allBooks: [ { genres: genres }, ...prev.allBooks ]
      }
    }
  })

  useEffect(() => {
    loadBooks({ variables: { genre: genre } })
  }, [genre, loadBooks])

  if (!props.show) {
    return null
  }

  if (resultGenres.loading || result.loading)
    return <>loading...</>

  const genres
    = [...new Set(resultGenres
      .data
      .allBooks
      .flatMap(b => b.genres))]

  const books
      = result.data.allBooks

  const radioListener = (e) => {
    setGenre(e.target.value)
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        <h4>select genre</h4>
        <label>
          <input type='radio' value='' name='genre'
            checked={genre === ''} onChange={radioListener} />
          all genres
        </label>
        {
          genres
            .map((g, i) => {
              return (
                <div key={i}>
                  <label>
                    <input type='radio' value={g} name='genre'
                      checked={genre === g} onChange={radioListener} />
                    {g}
                  </label>
                </div>
              )
            })
        }
      </div>
      <Booklist books={books} />
    </div>
  )
}

export default Books