import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apikey = import.meta.env.VITE_WEATHER_API_KEY

const getCapital = (lat, lon) => {
    return axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
}

export default { getCapital }