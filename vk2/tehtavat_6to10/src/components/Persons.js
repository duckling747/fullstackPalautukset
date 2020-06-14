import React from 'react'
import NameEntry from './NameEntry'

const Persons = ({ persons, filter }) => {
    return (
    <>
    {persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person, i) =>
        <NameEntry key={i} name={person.name} number={person.number} />
      )}
    </>
    )
}

export default Persons
