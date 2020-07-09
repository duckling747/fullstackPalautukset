
export const addVote = (anecdote) => {
  return {
    type: 'ADD_VOTE',
    data: {
      ...anecdote,
      votes: anecdote.votes+1
    }
  }
}

export const addAnecdote = (data) => {
  return {
    type: 'ADD_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
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
