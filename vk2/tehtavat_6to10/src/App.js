import React, { useState } from 'react'
import NameEntry from './components/NameEntry'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat( {name: newName, number: newNumber} ))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    // console.log("testing", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log("testing", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log("filter:", event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      filter names with <input value={filter} onChange={handleFilterChange} />
      <h2>Add new number</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person, i) =>
        <NameEntry key={i} name={person.name} number={person.number} />
      )}
    </div>
  )

}

export default App