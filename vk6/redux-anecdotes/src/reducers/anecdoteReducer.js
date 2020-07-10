import anecdoteService from '../services/anecdotes'

export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote 
      = await anecdoteService.update(
        { ...anecdote, votes: anecdote.votes+1 })
    dispatch ({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'ADD_VOTE':
      return state
        .map(a => a.id !== action.data.id ? a : action.data)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
