const Header = (prop1) => {
  console.log(prop1)
  return (
    <div>
      <h1>
        {prop1.course}
      </h1>
    </div>
  )
}

const Content = (prop2) => {
  console.log(prop2)
  return (
    <div>
      <Part part={prop2.parts[0].name} exercises={prop2.parts[0].exercises}/>
      <Part part={prop2.parts[1].name} exercises={prop2.parts[1].exercises}/>
      <Part part={prop2.parts[2].name} exercises={prop2.parts[2].exercises}/>
    </div>
  )
}

const Part = (prop2) => {
  console.log(prop2)
  return (
    <div>
      <p>
        {prop2.part} {prop2.exercises}
      </p>
    </div>
  )
}

const Total = (prop3) => {
  console.log(prop3)
  return (
    <div>
      <p>
        Number of exercises {prop3.parts[0].exercises + prop3.parts[1].exercises + prop3.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App