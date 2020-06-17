import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numService from './services/serveri'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(false)

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
    // console.log(duplicate)
    if (duplicate) {
      const okay = window.confirm(
      `${newName} is already added to phonebook, \
replace the old number with a new one?`
      )
      if (!okay) return
      numService
        .update(duplicate.id, { ...duplicate, number: newNumber })
        .then(returnedNum => {
          setPersons(
            persons
              .filter(p => p !== duplicate)
              .concat(returnedNum))
          setError(false)
          setMessage(`Person ${newName} updated`)
        })
        .catch(error => {
          setError(true)
          setMessage(`Updating failed to server`)
        })
    } else {
      numService
        .create(numberObject)
        .then(returnedNum => {
          setPersons(persons.concat(returnedNum))
          setError(false)
          setMessage(`Person ${newName} added`)
        })
        .catch(error => {
          setError(true)
          setMessage(`Adding failed to server`)
        })
    }
    setTimeout(() => {
      setMessage(null)
    }, 2000)
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
    numService
      .delNum(id)
      .then(retval => {
        setPersons(persons.filter(p => p.id !== id))
        setError(false)
        setMessage(`Person ${name} deleted`)
      })
      .catch(error => {
        setError(true)
        setMessage(`Already gone!`)
      })
    setTimeout(() => {
      setMessage(null)
    }, 2000);
  }
  const className = error ? "error" : "notification"
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} className={className} />
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
