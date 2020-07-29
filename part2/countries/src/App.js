import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  const [weather, setWeather] = useState([])
  const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.name}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => setWeather(response.data))
  }, [url])

  if (weather.length !== 0) {
    return (<div>
      <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
      <p><img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} /></p>
      <p><b>wind:</b> {weather.current.wind_speed + ' mph direction ' + weather.current.wind_dir}</p>
    </div>)
  } else {
    return (<div>Data not yet retrieved!</div>)
  }
}

const Countries = ({ filteredCountries, setFilter }) => {
  const count = filteredCountries.length

  if (count > 10) {
    return (<div><p>Too many matches, specify another filter</p></div>)
  } else if (count === 1) {

    return (<div>
      <h1>{filteredCountries[0].name}</h1>
        <p>capital {filteredCountries[0].capital}</p>
        <p>population {filteredCountries[0].population}</p>
      <h2>languages</h2>
        <ul>{filteredCountries[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
        <img width='100' src={filteredCountries[0].flag} alt={filteredCountries[0].name} />
      <h2>Weather in {filteredCountries[0].name}</h2>
        <Weather name={filteredCountries[0].name} />
    </div>)
  } else {
    return (
      <div>
        {filteredCountries.map(country =>
          <p key={country.name}>
            {country.name}
            <button onClick={() => setFilter(country.name)}>show</button>
          </p>)}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (response) => {
    setFilter(response.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div className="App">
      find countries: <input value={newFilter} onChange={handleFilterChange} />
      <Countries filteredCountries={filteredCountries} setFilter={setFilter} />
    </div>
  );
}

export default App;