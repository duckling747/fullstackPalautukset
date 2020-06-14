import React, { useState } from 'react'
import NameEntry from './components/NameEntry'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    setPersons(persons.concat( {name: newName} ))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log("testing", event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) =>
        <NameEntry key={i} name={person.name} />
      )}
    </div>
  )

}

export default App