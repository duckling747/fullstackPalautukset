import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNote } from '../reducers/noteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleForm = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(showNote(`CREATED: ${content}`, 5))
    }

    return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleForm}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
    )
}

export default AnecdoteForm
