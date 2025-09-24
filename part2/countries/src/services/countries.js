import axios from 'axios'

/*
>> In this component all the service function has been defined.
>> "axios" has been used to make api calls to some url get the country details and weather details.
>> all these functions returned the response data which are used in "useEffect" functions in the "app.jsx" file.
  and in the Weather.jsx file.
*/

/* The base url is the address for the json-server which has been configed in 3001 port. And, the
  "persons" object in "db.json" file contains all the data on which the server has been configured. 
*/


const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const all_countries_endpoint = 'api/all'
const country_endpoint = '/api/name'

const weather_baseUrl = "https://api.openweathermap.org/data/2.5/weather"


/* 
>> Remember that the OPEN WEATHER API KEY is set while starting the APP in the command prompt using SET command with && with npm run dev
   command. ex: set "VITE_WEATHER_API_KEY=the_key_itself" && npm run dev

>> Once, the environment variable is set while starting the project, it can be accessed via 
   import.meta.env.VARIABLE_NAME
*/

const open_weather_api = import.meta.env.VITE_WEATHER_API_KEY

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/${all_countries_endpoint}`)
  return request.then(response => response.data)
}

const getCountry = (country) => {
  const request = axios.get(`${baseUrl}/${country_endpoint}`)
  return request.then(response => response.data)
}

/*
>> we have constructed the below URL inside the axios.get() method as per the document of openweathermap
  api doc to make an API CALL to get the current weather data.
*/

const getWeatherDetails = (country) => {
  const request = axios.get(`${weather_baseUrl}?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${open_weather_api}`)
  return request.then(response => response.data)
}

export default { getAllCountries, getCountry, getWeatherDetails }