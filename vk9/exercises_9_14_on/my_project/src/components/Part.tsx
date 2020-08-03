import React from 'react'
import { CoursePart } from '../types/CoursePart'


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <p>
                    name: {part.name} <br></br>
                    exercises: {part.exerciseCount} <br></br>
                    description: {part.description}
                </p>
            )
        case "Using props to pass data":
            return (
                <p>
                    name: {part.name} <br></br>
                    exercises: {part.exerciseCount} <br></br>
                    group projects: {part.groupProjectCount}
                </p>
            )
        case "Deeper type usage":
            return (
                <p>
                    name: {part.name} <br></br>
                    exercises: {part.exerciseCount} <br></br>
                    description: {part.description} <br></br>
                    submission link: {part.exerciseSubmissionLink}
                </p>
            )
        case "Typescript fundaments":
            return (
                <p>
                    name: {part.name} <br></br>
                    exercises: {part.exerciseCount} <br></br>
                    description: {part.description} <br></br>
                    fun: {part.fun.toString()}
                </p>
            )
        default:
            return assertNever(part);
    }
}

export default Part
