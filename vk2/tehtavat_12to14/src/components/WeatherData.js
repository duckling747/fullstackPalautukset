import React, { useEffect, useState } from 'react'
import axios from 'axios'


const WeatherData = ({ city, api_key }) => {

    const [ weatherData, setWeatherData ] = useState({
        main: {
            temp: null,
            feels_like: null,
            temp_max: null,
            temp_min: null
        },
        weather: [
            {
                description: '',
            }
        ],
        wind: {
            speed: null,
            deg: null,
        }
    })

    const toCelsius = (degs) => (degs - 273.15).toFixed(1)

    const toKm = (miles) => (miles * 1.609344).toFixed(1)

    useEffect(() => {
        if (!api_key) return
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
        .then(res => {
            setWeatherData({ ...res.data })
        })
    }, [city, api_key])

    console.log(weatherData)

    return (
    <>
        <h3>
            Weather in {city}
        </h3>
        {weatherData.weather[0].description} <br></br>
        <strong>temperature:</strong> {toCelsius(weatherData.main.temp)} °C <br></br>
        <strong>feels like:</strong> {toCelsius(weatherData.main.feels_like)} °C <br></br>
        <strong>temp range:</strong> [{toCelsius(weatherData.main.temp_min)}, 
         {toCelsius(weatherData.main.temp_max)}] °C <br></br>
        <strong>wind:</strong> {toKm(weatherData.wind.speed)} km/h <br></br>
        <strong>wind direction</strong> {weatherData.wind.deg}°
    </>
    )
}

export default WeatherData
