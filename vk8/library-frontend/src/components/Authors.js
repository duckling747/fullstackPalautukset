import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { AUTHORS, EDIT_AUTHOR, BOOK_ADDED } from '../queries'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(AUTHORS)


  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: AUTHORS }]
  })

  result.subscribeToMore({
    document: BOOK_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data || !prev) return prev
      const origAuthors = prev.allAuthors
      const bookAuthor
        = subscriptionData.data.bookAdded.author
      if (origAuthors.includes(bookAuthor)) return prev
      return {
        ...prev,
        allAuthors: [ bookAuthor, ...prev.allAuthors ]
      }
    }
  })


  if (!props.show) {
    return null
  }

  if (result.loading) return <>loading...</>

  const authors = result.data.allAuthors


  const nameUpdateFormHandler = (event) => {
    event.preventDefault()

    if (!name) return
    const bb = parseInt(born)
    editAuthor({ variables: { name, born: bb } })


    setName('')
    setBorn('')
  }

  const birthyearForm = props.userToken !== null
  ? <>
    <h3>Set birthyear</h3>
    <form onSubmit={nameUpdateFormHandler}>
      {`name: `}
      <select value={name} onChange={e => setName(e.target.value)}>
        <option key={-1} value={''}>select name...</option>
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
  </>
  : null

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
      {birthyearForm}

    </div>
  )
}

export default Authors
