const Course = ({courses}) => {
  
  const Header = ({course}) => {
    return (
      <>
        <h2>{course.name}</h2>
      </>
    )
  }

  /*
  >> Within the Content component we are receiving "parts" of each course at a time when called inside
  the return statement of "Course" components down below.
  >>  
  */
  const Content = ({parts}) => {
    return (
      parts.map((part) => {
        return (
          <div key={part.id}>
            {part.name} : {part.exercises}
          </div>
        )
      }
    )
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((Sum, X) => Sum + X.exercises,0)
    return (
      <>
        <p><b>Total of {total} exercises</b></p>
      </>
    )
  }

  /* 
  >> In the below code block, map function basically take each "course" from the "courses" array and
  repeat the function defined within {}. So basically, the map function shows the course header, then
  the course contents consists of multiple parts and the total number of exercises for each "course".
  >> within map function, if we use jsx code, then the each html element requires an unique key identifier
  that why within <div> element "key={course.id}" has been inserted.
  */
  return (
    courses.map((course) => {
      return (
        <div key={course.id}>
          <Header course={course}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )
    }
    )
  )
}

export default Course

