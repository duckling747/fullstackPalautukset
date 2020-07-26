import React from 'react'

const Booklist = ({ books }) => {
    if (!books.length) return (
        <>no books match...</>
    )
    return (
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>
                author
                </th>
                <th>
                published
                </th>
            </tr>
            {books.map(a =>
                <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default Booklist
