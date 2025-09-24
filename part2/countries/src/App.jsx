import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryService from './services/countries'
import Countries from './components/Countries' 

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  /* 
  >> useEffect() is a React Hook that lets you synchronize a component with an external system. Here the app component getting its data
   from an URL "https://studies.cs.helsinki.fi/restcountries/" through a axios get request which returns a "promise" object. Handler of 
   the promise object has been implemented through the "then" method. JavaScript runtime env provided the "then" method with a response 
   object which contains all the essential data related to the response of an HTTP GET request, which would include the returned data, 
   status code, and headers. 

  >> Here, the we defined the axios.get request inside our own component "countries" (which is imported as "CountryService" in this file)
   as getAllCountries() method which only returns the response.data (only response data instead of whole response object) part. This data 
   part has been stored inside the "initialNotes" here. We are using the setPersons() method to set the state variable "persons" with 
   "initialNotes".
  */

  useEffect(() => {
      CountryService
        .getAllCountries()
        .then(initialCountryData => {
          setCountries(initialCountryData)
        })
    }, [])

  /*
  >> The biggest logic is that we are setting the value of the "filter" state variable in both handleClick and handleNewFilter.

  >> In handleClick, we are setting the "filter" state hook same as the "country name" beside which the "show" button is clicked. This
     helps including only one Country inside filteredCountries list so that inside "Countries.jsx" file, only "filteredCountries.length" === 1"
     logic runs and shows the Country Details except anything else(i.e list of countries with show button).

  >> "handleNewFilter" will changed the value of the "filter" state hook which will change the list of the filtered countries upon change.
      This will defined how many country name to be shown with the show button beisde them. Once the "filter" value is such so that there
      is only one country in the filteredCountries list, that country details will be shows as per the logic defined inside "Countries"
      component. 
  */
 
  const handleClick = (current_country) => {
      setFilter(current_country)
  }

  const handleNewFilter = (event) => setFilter(event.target.value)
  const filteredCountries = countries.filter(country => country.name.common.includes(filter))
 

  return (
    <>
      <div>
        <Filter filter={filter} handleNewFilter={handleNewFilter}/>
      </div>
      <div>
        <Countries filteredCountries={filteredCountries} handleClick={handleClick}/>
      </div>
        
    </>
  )
}

export default App
