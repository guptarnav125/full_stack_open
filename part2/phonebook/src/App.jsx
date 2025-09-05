import { useState } from 'react'

const Name = (props) => {
  return <li>{props.name} {props.number}</li>
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

const Persons=({ persons }) => {
  return (
    <ul>
      {persons.map((person,index) => 
        <Name name={person.name} number={person.number} key={index}/>
      )}
    </ul>
  )
}

const App = () => {
  const [allPersons, setAllPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [persons, setPersons] = useState(allPersons);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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

  const addName = (event) => {
    event.preventDefault()
    const nameObject = { name: newName , number: newNumber, id: allPersons.length + 1 }
    if (allPersons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const updatedPersons = allPersons.concat(nameObject)
    setAllPersons(updatedPersons)
    setPersons(updatedPersons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  ));
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onFilterChange={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
  )
}

export default App