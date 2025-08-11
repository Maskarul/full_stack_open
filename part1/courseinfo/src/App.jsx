const App = () => {

  /*
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  */

  /* redified the above variables as object in the below */

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course_name={course.name}/>
      <Content part={course.parts}/>
      <Total part={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1> {props.course_name} </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part ={props.part[0]['name']} exercises={props.part[0]['exercises']}/>
      <Part part ={props.part[1]['name']} exercises={props.part[1]['exercises']}/>
      <Part part ={props.part[2]['name']} exercises={props.part[2]['exercises']}/>
      
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises : {props.part[0]['exercises'] + props.part[1]['exercises'] + props.part[2]['exercises']}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {/* as the value of the props "part" and "exercise" changes, the below */}
        {props.part} : {props.exercises}
      </p>
    </div>
  )
}

export default App