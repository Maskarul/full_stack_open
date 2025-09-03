const Persons = (props) => {

    /*
    >> "persons" state variable data used to show all the person's details i.e name & number currently in the object in the page.
    >> "filter" state variable data has been used to check if the string in the "filter" variable contains in the person's name
      in "persons" object. And, it has been used in a condition to decide whether to execute "HandleNoFilter" method or "HandleFilteredName"
      method within the jsx portion. 
    >> "handleDelete" method has been mentioned under the "onCLick" attribute so that when the "delete" button is pressed the "handleDelete"
      method is called to delete the data of the person beside which the button is clicked.
    */
    const persons = props.persons
    const filter = props.filter
    const handleDelete = props.handleDelete

    /*
    >> "HandleNoFilter" method basically called when there is no filter i.e "filter" state variable is an empty string.
    */

    const HandleNoFilter = () => {
    return (
      persons.map((person) => {
        return (           
          <p key={Math.random()}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> 
          </p>
        )
      }
      )
    )
    }

    /*
    >> "HandleFilteredName" method basically called when "filter" state variable is non-empty. It makes sure to show only those person
      details whose names contains the filter string.
    */

    const HandleFilteredName = () => {
      return (
        persons.map((person) => {
        if (person.name.includes(filter)) {
          return (
            <p key={Math.random()}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> 
          </p>
          )
        }
        }
      )
      )
    }
  
  /*
  >> in the jsx section, a condition has been written to check if the "filter" is empty or not to decide whether to execute "HandleNoFilter"
    or "HandleFilteredName" component. 
  */

  return (
    <div>
        {filter === ''
        ? <HandleNoFilter />
        : <HandleFilteredName />
        }
    </div>
  )
}

export default Persons