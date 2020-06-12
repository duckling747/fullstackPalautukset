import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const Header = ({ text }) =>
  <h1>
    {text}
  </h1>

const App = ( {anecdotes} ) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null,
    new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  const [maxIndex, setMaxIndex] = useState(0)

  const getRandom = (a, b) => {
    const randomNum = Math.floor(Math.random() * (b - a) + a)
    //console.log(randomNum)
    return randomNum
  }

  const handleButtonAnecdote = () => {
    setSelected(getRandom(0, anecdotes.length))
  }

  const handleButtonVote = () => {
    const copy = [ ...votes ]
    copy[selected]++
    setVotes(copy)
    setMaxIndex(getMaxIndex(copy))
  }

  const getMaxIndex = (ccc) => {
    if (ccc.length === 0)
      return -1
    let max = ccc[0]
    let index = 0
    //console.log("len: ", ccc.length)
    for (let i = 1; i < ccc.length; i++) {
      if (ccc[i] > max) {
        index = i
        max = ccc[i]
      }
    }
    //console.log('max index: ', index)
    return index
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]} <br></br>
      has {votes[selected]} votes <br></br>
      <Button onClick={handleButtonVote} text='vote' />
      <Button onClick={handleButtonAnecdote} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      {anecdotes[maxIndex]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
