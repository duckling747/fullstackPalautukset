import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ( {course} ) => {
    return (
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </>
    )
}

export default Course