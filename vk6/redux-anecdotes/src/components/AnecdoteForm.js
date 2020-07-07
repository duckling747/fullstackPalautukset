import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNote } from '../reducers/noteReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleForm = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(addAnecdote(anecdote))
        dispatch(showNote(`CREATED: ${anecdote}`))
        setTimeout(() => {
          dispatch(showNote(''))
        }, 5000);
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
