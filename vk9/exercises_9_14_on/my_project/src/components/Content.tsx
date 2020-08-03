import React from 'react'
import Part from './Part'
import { CoursePart } from '../types/CoursePart'


const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
    return (
      <>
        {
          courseParts.map((p, i) =>
            <Part key={i} part={p} />
          )
        }
      </>
    )
}

export default Content
