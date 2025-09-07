import { useState, useEffect } from 'react'
import personService from './personService'

const Name = (props) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${props.name} ?`)) {
      personService
        .deletePerson(props.id)
        .then(() => {
          alert(`${props.name} has been deleted`)
          props.onDelete(props.id)
        })
        .catch(error => {
          console.error("There was an error deleting the person!", error)
        })
    }
  }
  return <li>
          {props.name} {props.number}  
          <button onClick={handleDelete}> delete</button>
        </li>
    
}

const Filter = ({ filter, onFilterChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={filter} onChange={onFilterChange}/>
      </div>
    </form>
  )
}

const PersonForm=({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons=({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person,index) => 
        <Name name={person.name} number={person.number} id ={person.id } onDelete={onDelete} key={person.id}/>
      )}
    </ul>
  )
}

const App = () => {
  const [allPersons, setAllPersons] = useState([]) 
  const [persons, setPersons] = useState(allPersons);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value.trimStart())
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value.trim())
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    if (event.target.value === '') {
      setPersons(allPersons)
      return
    }
    const filtered = allPersons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersons(filtered)
  }

  const handleDelete = (id) => {
    const updatedPersons = allPersons.filter(person => person.id !== id)
    setAllPersons(updatedPersons)
    setPersons(updatedPersons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    ));
  }

  const addName = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()
    if (trimmedName === '' || trimmedNumber === '') {
      alert("Name or Number cannot be empty")
      return
    }
    const nameObject = { name: trimmedName, number: trimmedNumber}
    if (allPersons.some(person => person.name === trimmedName && person.number === trimmedNumber)) {
      alert(`${trimmedName} is already added to phonebook with this number`)
      setNewName('')
      setNewNumber('')
      return
    }
    if (allPersons.some(person => person.name === trimmedName)) {
      if (window.confirm(`${trimmedName} is already added to phone book, replace the old number with new one?`)) {
        const id = allPersons.find(person => person.name === trimmedName).id
        nameObject.id = id
      personService
        .update(id, nameObject)
        .then(() => {
          const updatedPersons = allPersons.map(person => person.name === trimmedName ? nameObject : person)
          setAllPersons(updatedPersons)
          setPersons(updatedPersons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
          ));
        })
        .catch(error => {
          console.error("There was an error updating the person!", error)
        })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    personService
      .create(nameObject)
      .then(returnedPerson => {
        const updatedPersons = allPersons.concat(returnedPerson)
        setAllPersons(updatedPersons)
        setPersons(updatedPersons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
        ));
        setNewName('')
        setNewNumber('')      
    })
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(inititalPersons => {
        console.log('promise fulfilled')
        setAllPersons(inititalPersons)
        setPersons(inititalPersons) 
      })
  }, [])
  console.log('render', persons.length, 'persons')


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onFilterChange={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} onDelete={handleDelete}/>
    </div>
  )
}

export default App