import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {

    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
      console.log('value:', event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  
export  const useCountry = (name) => {

    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (!name) return
        axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then(response => setCountry(
                { data: response.data[0], found: true }
            ))
            .catch(e => {
                switch (e.response.status) {
                    case 404:
                        console.log('404')
                        setCountry({ found: false })
                        break
                }
            })
        console.log('country:', country)

    }, [name])

    
    return country
}
  