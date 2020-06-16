import React from 'react'
import ListEntry from './ListEntry'
import OutputLine from './OutputLine'
import WeatherData from './WeatherData'

const CountryDetails = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    let weatherdata
    if (api_key) {
        weatherdata = <WeatherData city={country.capital} api_key={api_key} />
    }
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
          {weatherdata}
        </>
      )
}

export default CountryDetails
