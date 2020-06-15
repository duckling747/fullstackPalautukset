import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

const App = () => {

  const [search, setSearch] = useState('')
  const [response, setResponse] = useState([])
  const [buttoned, setButtoned] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResponse(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
    setButtoned(false)
  }

  const handleButtons = (searchParam) => {
    setButtoned(true)
    setSearch(searchParam)
  }
  const listToPass = buttoned
  ? response.filter(e => e.name === search)
  : response.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      find countries <input value={search} onChange={handleSearchChange} />
      <CountryList filtered={listToPass} handleButtons={handleButtons} />
    </>
  )
}

export default App;
