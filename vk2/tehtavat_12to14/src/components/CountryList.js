import React from 'react'
import ListEntry, { ExtendedListEntry } from './ListEntry'
import OutputLine from './OutputLine'

const CountryList = ({ filtered, handleButtons }) => {
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
              <ExtendedListEntry key={i} text={country.name} onClick={handleButtons} />
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
      } else {
          return (
              <p>
                  no matches
              </p>
          )
      }
}

export default CountryList
