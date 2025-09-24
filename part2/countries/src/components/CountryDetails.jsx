import Weather from "./Weather"

const CountryDetalis = (props) => {

    const Country = props.Country

    /* If the Country variable is empty string then make the Languages an empty array or else take only the values (leaving the keys out)
     from the object returned by the "Country.languages" object.
    */
    const Languages = (Country === '')? []: Object.values(Country.languages)
    
    /* 
    >> In the below, we are just returning with Country Name with it's capital and area, it's languages. We are showing the country 
       flag. 

    >> To show all the weather data of a country, we are calling the separate Weather component 
    */

    return (
        <div>
            <h1>{Country.name.common}</h1>
            <p>Capital {Country.capital} <br/>Area {Country.area}</p>
            <div>
                <h2>Languages</h2>
                {Languages.map(language => <li key={Math.random()}>{language}</li>)}
            </div><br/>
            <div>
                <img src={Country.flags.png} alt="Country_flag"/>
            </div>
            <div>
                <Weather Country={Country}/>
            </div>
        </div>
        
    )
}

export default CountryDetalis