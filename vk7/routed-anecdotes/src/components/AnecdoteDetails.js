import React from 'react'
// import { useParams } from 'react-router-dom'

const AnecdoteDetails = ({ anecdote }) => {
    //const id = useParams().id
    //const anecdote = anecdotes.find(a => a.id === id)
    return (
    <>
        <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
        <p>
            has {anecdote.votes} votes
        </p>
        <p>
            for more info see {' '}
            <a href={anecdote.info}>{anecdote.info}</a>
        </p>
    </>
    )
}

export default AnecdoteDetails
