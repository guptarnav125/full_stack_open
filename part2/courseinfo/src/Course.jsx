const Course = ({ course }) => {
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
    return (
      <div>
        {prop2.parts.map(element => (
          <Part part={element.name} exercises={element.exercises} key={element.id}/>
        ))}
      </div>
    )
  }

  const Total = (prop3) => {
    console.log(prop3)
    const sum=0
    const sumWithInitial = prop3.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      sum,
    );
    return (
      <div>
        <p>
          <b>
            Total of {sumWithInitial} exercises
          </b>
        </p>
      </div>
    )
  }
  return (
    <>
      {course.map(element => (
        <div key={element.id}>
          <Header course={element.name} />
          <Content parts={element.parts} /> 
          <Total parts={element.parts} /> 
        </div>
      ))}
    </>
  )
}

export default Course