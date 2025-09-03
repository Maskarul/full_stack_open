import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  /*
  >> The below three state variable has been defined to handle the notification.
  >> Two of them created to store the success message and error message.
  >> And the "messageType" has been created to hold the type of the message to be displayed. This
    is used to decide which "Notification" component to execute.
  */
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

 
  /* 
  >> useEffect() is a React Hook that lets you synchronize a component with an external system. Here the app component getting its data
   from a json-server through a axios get request which returns a "promise" object. Handler of the promise object has been implemented
   through the "then" method. JavaScript runtime env provided the "then" method with a response object which contains all the essential
   data related to the response of an HTTP GET request, which would include the returned data, status code, and headers. 

  >> Here, the we defined the axios.get request inside our own component "persons" (which is imported as "personService" in this file)
   as getAll() method which only returns the response.data (only response data instead of whole response object) part. This data part 
   has been stored inside the "initialNotes" here. We are using the setPersons() method to set the state variable "persons" with 
   "initialNotes".
  */

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  /* 
  Retrived only names from persons array of objects to make a list out of it just to use it in the handleSubmit() 
  function if "if" statement.
  */
  const onlyNames = persons.map(person => person.name)

  /*
  >> "handleSubmit" function handles the form submittion of with the name and phone number of the person. It prevent the default submittion
    of the form and page reload. Then checks if the newly added name is already present in the phonebook. If exist, then open a pop-up
    with a confirmation whether to replace the old phone number with the new one. If confirmation given, then it updates the json-server
    with the chnaged phone number of that particular person and show a notification on the page saying that the old number is replaced for
    3 seconds. And, then it set the "persons" state variable with the updated phone number which will re-render the page with update info.
  >> If the newly added person is not present in the phonebook then it creates a new object with the person's name and phone number
    send a post request to the json-server. And, then show a notification that the new person details has been added for 2 secs.
    And, then it set the "persons" state variable with the updated phone number which will re-render the page with update info.
  */
  const handleSubmit = (event) => {
    event.preventDefault()
    if (onlyNames.includes(newName)) {
      const existingPerson = persons.find(person => person.name === newName)
      const changedPerson = {...existingPerson, number: newPhoneNumber}
      confirm(`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`)
      personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setMessageType('success')
        setSuccessMessage(`Old number of ${returnedPerson.name} has been replaced with a new one`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        setNewName('')
        setNewPhoneNumber('')
      })
    } else {
      const newPersonObject = {name: newName, number: newPhoneNumber}
      personService
      .create(newPersonObject)
      .then(returnedPerson => {
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhoneNumber('')
      })
    }
  } 

  /*
  >> The below handleDelete() method handles deleting a person from the server as well as updating the page.
  >> handleDelete takes the "id" attribute to identify the person which needed to be deleted. When the "delete" button is pressed
     beside a person, the "onClick" attribute calls the handleDelete() method and pass on the person's id where the button is situated.
  >> ".find()" finds the person by it's id.
  >> confirm() method within the "if" statement basically generates a pop-up asking for confirmation or cancellation whether to execute
     the block of codes within the "if" statement.
  >> personService is a component within the "service" directory which is imported in app.jsx and deletePerson() is method defined under
     the personService component which basically calls a axios.delete() method. axios.delete() generates a HTTP delete request to delete
     a resouce from the server.

  */
  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(deleteInfo => {
        setMessageType('success')
        setSuccessMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== person.id))
      }) 
      .catch(error => {
        setMessageType('error')
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewPhoneNumber = (event) => setNewPhoneNumber(event.target.value)

  const handleNewFilter = (event) => setFilter(event.target.value)


  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        {(messageType === 'success') ? <Notification message={successMessage} messageType={messageType}/> : <Notification message={errorMessage} messageType={messageType}/>}
      </div>
      <div>
        <Filter filter={filter} handleNewFilter={handleNewFilter}/>
      </div>
      <div>
        <h2>Add a new</h2>
        <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newPhoneNumber={newPhoneNumber} handleNewPhoneNumber={handleNewPhoneNumber}/>
      </div>
      <div>
        <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App