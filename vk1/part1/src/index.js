import React from 'react'
import ReactDOM from 'react-dom'


const Header = (p) =>
(
  <h1>{p.course}</h1>
)

const Content = (p) =>
(
  <>
    <Part part={p.part1} />
    <Part part={p.part2} />
    <Part part={p.part3} />
  </>
)

const Part = (p) =>
(
  <p>
    {p.part.name} {p.part.exercises}
  </p>
)

const Total = (p) =>
(
  <p>
    Number of exercises {p.exercises1 + p.exercises2 + p.exercises3}
  </p>
)

const App = () => {
  const course = "Half stack application development"
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  }
  const part2 = {
    name : "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name: "State of a component",
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises1={part1["exercises"]} exercises2={part2["exercises"]}
        exercises3={part3["exercises"]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
