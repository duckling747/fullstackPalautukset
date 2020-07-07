import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const handleVote = (anecdote) => {
      console.log('vote', anecdote)
      dispatch(addVote(anecdote))
    }
  
    return (
      <>
        <h2>Anecdotes</h2>
        {anecdotes
        .sort((a,b) => b.votes-a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
        )}
      </>
    )
}

export default AnecdoteList
