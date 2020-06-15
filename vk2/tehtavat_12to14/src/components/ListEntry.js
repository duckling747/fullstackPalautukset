import React from 'react'

const ListEntry = ({ text }) =>
    <li>{ text }</li>

export const ExtendedListEntry = ({ text, onClick }) =>
    <li>{ text } <button onClick={() => onClick(text)}>show</button></li>

export default ListEntry