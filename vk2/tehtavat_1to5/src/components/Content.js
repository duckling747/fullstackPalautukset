import React from 'react'
import Part from './Part'

const Content = ({ parts }) =>
(
  <>
    {parts.map((part, i) =>
        <Part key={part.id} part={part} />
    )}
  </>
)

export default Content