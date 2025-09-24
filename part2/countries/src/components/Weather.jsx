import CountryService from '../services/countries'
import { useState } from 'react'



const Weather = (props) => {

    const Country = props.Country

    const [Temperature, setTemperature] = useState(null)
    const [Wind, setWind] = useState(null)
    const [icon, setIcon] = useState(null)

    /* 
    >> In the below, we are calling the "getWeatherDetails" method defined inside the "countries.js" file for the country that we want 
       the weather data of. All the weather data of that country is stored "WeatherData" object. We are setting the temperature, wind and
       weather icon from the WeatherData object. 

    >> .toFixed() method is called to set the decimal number to two place. Minus -273.15 has been done to convert the temperature from
        kelvin to celcius.

    >> Know that for different weather we have different weather icon. We get the "icon_id" from the WeatherData object. Then using that
       "icon_id" we will call call an API to get the "Weather Icon"
    */

    CountryService
        .getWeatherDetails(Country)
        .then(WeatherData => {
             setTemperature((WeatherData.main.temp-273.15).toFixed(2))
             setWind(WeatherData.wind.speed)
             setIcon(WeatherData.weather[0].icon)
        })

    return(
        <div>
            <p>Temperature {Temperature} Celsius</p>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt='Weather Icon'/>
            <p>Wind {Wind} m/s</p>
        </div>
    )
    
}

export default Weather