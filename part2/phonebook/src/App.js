import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ myMessage, setMyMessage] = useState([])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  const handleDelete = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName} ?`)) {
    personService
      .removeElement(id)
      .then(() => setPersons(persons.filter((person)=> person.id !== id)))
      .catch( error => {
        setMyMessage({message: `Information of ${personName} has already been removed from server`, type: 'error'})
        setTimeout(() => {setMyMessage([])}, 5000)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const selectedPerson = persons.find(person => person.name === newName)
    if (selectedPerson) {
      if (window.confirm(`${selectedPerson.personName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...selectedPerson, number:newNumber}
        personService
          .update(selectedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== selectedPerson.id ? person : returnedPerson))
            setMyMessage({message: `Changed phone number of ${returnedPerson.name}`, type: 'success'})
            setTimeout(() => {setMyMessage([])}, 5000)
          })
          .catch( error => {
            setMyMessage({message: `Information of ${selectedPerson.name} has already been removed from server`, type: 'error'})
            setPersons(persons.filter((person)=> person.id !== selectedPerson.id))
            setTimeout(() => {setMyMessage([])}, 5000)
          })
      }
    }else{
      const personObject = {
        name : newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMyMessage({message: `Added ${returnedPerson.name}`, type: 'success'})
          setTimeout(() => {setMyMessage([])}, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMyMessage({message: error.response.data.error, type: 'error'})
          setTimeout(() => {setMyMessage([])}, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={myMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
                  newNumber= {newNumber} handleNumberChange={handleNumberChange}
                  addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App