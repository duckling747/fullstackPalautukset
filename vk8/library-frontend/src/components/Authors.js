import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(AUTHORS)


  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: AUTHORS }]
  })


  if (!props.show) {
    return null
  }

  if (result.loading) return <>loading...</>

  const authors = result.data.allAuthors


  const nameUpdateFormHandler = (event) => {
    event.preventDefault()

    const bb = parseInt(born)
    editAuthor({ variables: { name: name || authors[0].name, born: bb } })


    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={nameUpdateFormHandler}>
        {`name: `}
        <select value={name || authors[0].name} onChange={e => setName(e.target.value)}>
          {
            authors
              .map((a, i) =>
                <option key={i} value={a.name}>{a.name}</option>
            )
          }
        </select>
        {` born: `}
        <input value={born} onChange={e => setBorn(e.target.value)} />
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
