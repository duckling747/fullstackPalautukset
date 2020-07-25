import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GENRES, GENRE_BOOKS } from '../queries'

const Books = (props) => {

  const resultGenres = useQuery(GENRES)

  const [genre, setGenre] = useState('')

  const [loadBooks, result] = useLazyQuery(GENRE_BOOKS)


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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books