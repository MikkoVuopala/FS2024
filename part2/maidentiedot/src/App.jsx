import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Weather = ({lat, lng, capital}) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    weatherService
      .getCapital(lat, lng)
      .then(response => {
        setWeather(response.data)
      })
  }, [lat, lng, capital])

  if(!weather) {
    return <p>Loading...</p>
  }

  const temp = weather.main.temp
  const imgAdr = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  const wind = weather.wind.speed

  return (
    <>
      {console.log(weather)}
      <h2>Weather in {capital}</h2>
      <p>Temperature {temp} Celsius</p>
      <img src={imgAdr} alt=''/>
      <p>Wind {wind} m/s</p>
    </>
  )
}

const Languages = ({ languageList }) => {
  const langs = Object.values(languageList)
  return (
    <>
    <h3>Languages:</h3>
    <ul>
      {langs.map(l => 
        <li key={l}>{l}</li>
      )}
    </ul>
    </>
  )
}

const Countries = ({ countryList, showFunc }) => {
  const countryCount = countryList.length
  if (countryCount > 1 && countryCount <= 10) {
    return (
      <div>
        {countryList.map(c => 
          <p key={c.name.common}>{c.name.common}<button value={c.name.common} onClick={showFunc}>Show</button></p>
        )}
      </div>
    )
  } else if (countryCount === 0) {
    return (
      <div>
        <p>No matches.</p>
      </div>
    )
  } else if (countryCount === 1) {
    return (
        countryList.map(c =>
        <div key={c.name.common}>
          <h2>{c.name.common}</h2>
          <p>Capital {c.capital[0]}</p>
          <p>Area {c.area}</p>
          {console.log(c.languages)}
          <Languages languageList={c.languages}/>
          <img src={c.flags["png"]} alt="" />
          {console.log(c.capitalInfo)}
          <Weather lat={c.capitalInfo.latlng[0]} lng={c.capitalInfo.latlng[1]} capital={c.capital[0]} />
        </div>
        )
      
    )
  }
  return (
    <div>
      <p>Too many matches, specify another filter.</p>
    </div>
  )
}

const Filter = ({ filt , func}) => {
  return (
    <div>
      filter with: <input value={filt} onChange={func}/>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.includes(filter))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleShowCountry = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filt={filter} func={handleFilterChange}/>
      <Countries countryList={countriesToShow} showFunc={handleShowCountry}/>
    </div>
  )
}

export default App
