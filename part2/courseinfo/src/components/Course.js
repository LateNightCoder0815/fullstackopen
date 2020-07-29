import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
  const sum = course.parts.reduce((s, p) => {
                const copy = {...p} // reduce result can not only be an integer to match next elements
                copy.exercises = s.exercises + p.exercises
                return(copy)
              }).exercises
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part part={part} key={part.id}/>)}
    </div>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course