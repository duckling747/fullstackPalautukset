import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notes: noteReducer,
    filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store
