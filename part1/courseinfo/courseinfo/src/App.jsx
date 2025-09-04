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
      <Part part={prop2.parts[0]} exercises={prop2.exercises[0]}/>
      <Part part={prop2.parts[1]} exercises={prop2.exercises[1]}/>
      <Part part={prop2.parts[2]} exercises={prop2.exercises[2]}/>
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
        Number of exercises {prop3.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts=[part1,part2,part3]
  const exercises=[exercises1,exercises2,exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App