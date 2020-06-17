import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numService from './services/serveri'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
      numService
        .getAll()
        .then(initialNumbers => {
          setPersons(initialNumbers)
        })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = { name: newName, number:newNumber }
    const duplicate = persons.find(p => p.name === newName)
    if (duplicate) {
      const reply = window.confirm(
      `${newName} is already added to phonebook, \
replace the old number with a new one?`
)
      if (!reply) return
      numService
        .update(duplicate.id, { ...duplicate, number: newNumber })
        .then(returnedNum => {
          setPersons(
            persons
              .filter(p => p !== duplicate)
              .concat(returnedNum))
        })
    } else {
      numService
        .create(numberObject)
        .then(returnedNum => {
          setPersons(persons.concat(returnedNum))
        })
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
    // console.log("filter:", event.target.value)
    setFilter(event.target.value)
  }

  const handleDel = (id, name) => {
    const response 
      = window.confirm(`Poistetaanko ${name}?`)
    if (!response) return
    numService.delNum(id)
    setPersons(persons.filter(p => p.id !== id))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <PersonForm addNumber={addNumber}
       newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} delHandler={handleDel} />
    </div>
  )

}

export default App