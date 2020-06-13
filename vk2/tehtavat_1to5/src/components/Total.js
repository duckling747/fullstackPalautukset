import React from 'react'

const Total = ({ parts }) =>
(
  <p>
    total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
  </p>
)
export default Total