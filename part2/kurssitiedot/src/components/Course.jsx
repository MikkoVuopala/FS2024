const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
}
  
const Part = ({ part , exer }) => {
    return (
      <p>{part} {exer}</p>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
          {parts.map(part =>
            <Part key={part.id} part={part.name} exer={part.exercises}/>
          )}
      </div>
    )
}
  
const Total = ({ parts }) => {
    const ex = parts.map(part => part.exercises)
    const total = ex.reduce((res, add) => res + add)
    return (
      <h5>
        total of {total} exercises
      </h5>
    )
}
  
const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course