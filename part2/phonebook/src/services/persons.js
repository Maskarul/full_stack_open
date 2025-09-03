import axios from 'axios'

/*
>> In this component all the service function has been defined.
>> "axios" has been used to communicate with the json-server with HTTP requests.
>> all these functions returned the response data which are used in "useEffect", "handleSubmit", "handleDelete"
  functions in the "app.jsx" file.
*/

/* The base url is the address for the json-server which has been configed in 3001 port. And, the
  "persons" object in "db.json" file contains all the data on which the server has been configured. 
*/

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }