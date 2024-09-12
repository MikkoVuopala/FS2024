import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({ filt , func}) => {
  return (
    <div>
      filter with: <input value={filt} onChange={func}/>
    </div>
  )
}

const PersonForm = ({ name, number, addFunc, nameFunc, numberFunc }) => {
  return (
    <div>
      <form onSubmit={addFunc}>
        <div>
          name: <input value={name} onChange={nameFunc}/>
        </div>
        <div>
          number: <input value={number} onChange={numberFunc}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ phonebook, func }) => {
  return(
    <div>
      {phonebook.map(person => 
        <p key={person.name}>{person.name} {person.number}<button key={person.id} id={person.id} onClick={func}>delete</button></p>
      )}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const getAllContacts  = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(getAllContacts, [])

  const numbersToShow = persons.filter(p => p.name.includes(filter) === true)

  const addNumber = (event) => {
    event.preventDefault()
    const numberObj = {
      name: newName,
      number: newNumber
    }
    if (persons.map(p => p.name).includes(newName)) {
      if(confirm(`${newName} already exists in the phonebook. Update the number?`)) {
        const personID = persons.find(p => p.name === newName).id
        personService
          .update(personID, numberObj)
          .then(response => {
            setPersons(persons.map(p => p.id !== personID ? p : response.data))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`The number for ${response.data.name} was successfully updated.`)
            setTimeout(() => {
            setSuccessMessage(null)
            }, 3000)
          })
      }
    } else {
      personService
        .create(numberObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`${response.data.name} was successfully added to the phonebook.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
    }
    
  }

  const delNumber = (event) => {
    event.preventDefault()
    console.log(event.target.id)
    const pers = persons.find(p => p.id === event.target.id)
    if (confirm('Remove this person from the contacts')) {
      personService
        .deletePerson(pers.id)
        .then(response => {
          console.log(`Deleting `, response.data)
          getAllContacts()
          setSuccessMessage(`${response.data.name} was successfully removed from the phonebook.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log("We reached here")
          setErrorMessage(`Contact with an ID of ${event.target.id} was already removed`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter filt={filter} func={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        name={newName}
        number={newNumber}
        addFunc={addNumber}
        nameFunc={handleNameChange}
        numberFunc={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons phonebook={numbersToShow} func={delNumber}/>
    </div>
  )

}

export default App
