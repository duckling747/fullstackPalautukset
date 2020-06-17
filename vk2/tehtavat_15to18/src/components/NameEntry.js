import React from 'react'

const NameEntry = ({ name, number, delHandler }) =>
    <p>{name} {number} <button onClick={delHandler}>delete</button></p>

export default NameEntry