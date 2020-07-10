import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNote } from '../reducers/noteReducer'
import Filter from './Filter'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
  
    const handleVote = (anecdote) => {
      // console.log('vote', anecdote)
      dispatch(addVote(anecdote))
      dispatch(showNote(`VOTED: ${anecdote.content}`, 5))
    }
  
    return (
      <>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
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
