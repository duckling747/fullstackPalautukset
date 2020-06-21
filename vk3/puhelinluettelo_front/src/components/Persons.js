import React from 'react'
import NameEntry from './NameEntry'

const Persons = ({ persons, filter, delHandler }) => {
    return (
    <>
    {persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person, i) =>
        <NameEntry 
         key={person.id}
         name={person.name} 
         number={person.number} 
         delHandler={() => delHandler(person.id, person.name)} />
      )}
    </>
    )
}

export default Persons
