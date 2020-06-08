import React from 'react'
import ReactDOM from 'react-dom'


const Header = (p) =>
(
  <h1>{p.course}</h1>
)

const Content = (p) =>
(
  <>
    <Part part={p.parts[0]} />
    <Part part={p.parts[1]} />
    <Part part={p.parts[2]} />
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
    Number of exercises {p.parts[0].exercises
     + p.parts[1].exercises + p.parts[2].exercises}
  </p>
)

const App = () => {
  const course = "Half stack application development"
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name : "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
