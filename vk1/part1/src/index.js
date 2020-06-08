import React from 'react'
import ReactDOM from 'react-dom'


const Header = (p) =>
(
  <h1>{p.course}</h1>
)

const Content = (p) =>
(
  <>
    <Part part={p.part1} exercises={p.exercises1} />
    <Part part={p.part2} exercises={p.exercises2} />
    <Part part={p.part3} exercises={p.exercises3} />
  </>
)

const Part = (p) =>
(
  <p>
    {p.part} {p.exercises}
  </p>
)

const Total = (p) =>
(
  <p>Number of exercises {p.exercises1 + p.exercises2 + p.exercises3}</p>
)

const App = () => {
  const course = "Half stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2}
        exercises3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
