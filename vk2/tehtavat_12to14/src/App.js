import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListEntry from './components/ListEntry'
import OutputLine from './components/OutputLine'

const App = () => {

  const [search, setSearch] = useState('')
  const [response, setResponse] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setResponse(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
  const filtered 
    = response
      .filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      find countries <input value={search} onChange={handleSearchChange} />
      {
        (() => {
          if (filtered.length > 10) {
            return (
              <p>
              too many matches, specify another filter
              </p>
            )
          } else if (filtered.length > 1) {
            return (
              <ul>
                {filtered.map((country, i) => 
                  <ListEntry key={i} text={country.name} />
                )}
              </ul>
            )
          } else if (filtered.length === 1) {
            const country = filtered[0]
            return (
              <>
                <h2>{country.name}</h2>
                <OutputLine text1='capital' text2={country.capital} />
                <OutputLine text1='population' text2={country.population} />
                <h3>languages</h3>
                <ul>
                  {country.languages.map((lang, i) =>
                    <ListEntry key={i} text={lang.name} />
                  )}
                </ul>
                <img src={country.flag} alt="country's flag" width={300} />
              </>
            )
          }
        })()
      }
    </>
    )
  
}

export default App;
