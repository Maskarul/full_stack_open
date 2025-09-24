import CountryDetails from './CountryDetails'

const Countries = ({filteredCountries, handleClick}) => {

    /*
    >> If the number of the filtered countries is more than 10, then we are just showing the "Too many matches, ..." message.
    >> If the number of the filtered countries is more and 1 and less then 10, then we are showing the list of the country names 
    with a dedicated "show" button beside it. When the "Show" button clicked, it will show the details of the country which is beside it.
    >> When the number of filtered countries comes down to one as per the filter, then only we are showing the country details. In this 
       case, we are passing the first and the only member of the filteredCountries list to the CountryDetails component.
    */

    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (filteredCountries.length > 1) {
        return (
            <div>
                {
                  filteredCountries.map(country => {
                    return (
                    <div key={country.cca3}> 
                        {country.name.common} 
                        <button type="button" onClick={() => handleClick(country.name.common)}> Show</button> 
                    </div>
                    )
                  } 
                 )
                }
            </div>
        )
    } else if (filteredCountries.length === 1) {
        return <CountryDetails Country={filteredCountries[0]} />
    } else {
        return <div>No Matches Found</div>
    }
}

export default Countries