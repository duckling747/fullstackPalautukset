import React from 'react'
import { ExtendedListEntry } from './ListEntry'
import CountryDetails from './CountryDetails'

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
        return <CountryDetails country={filtered[0]} />
      } else {
          return (
              <p>
                  no matches
              </p>
          )
      }
}

export default CountryList
