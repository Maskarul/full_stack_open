import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return(
    <>
      <tr>
        <td>{props.text} {props.value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={props.good}/>
          <StatisticLine text={'neutral'} value={props.neutral}/>
          <StatisticLine text={'bad'} value={props.bad}/>
          <StatisticLine text={'all'} value={props.total}/>
          <StatisticLine text={'average'} value={(props.good*1+props.neutral*0+props.bad*-1)/props.total}/>
          <StatisticLine text={'positive'} value={(props.good/props.total)*100+'%'}/>
        </tbody>
      </table> 
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const setGoodClick = () => {
    setTotal(total+1)
    setGood(good+1)
  }

  const setNeutralClick = () => {
    setTotal(total+1)
    setNeutral(neutral+1)
  }

  const setBadClick = () => {
    setTotal(total+1)
    setBad(bad+1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={setGoodClick} text={'good'}/>
      <Button onClick={setNeutralClick} text={'neutral'}/>
      <Button onClick={setBadClick} text={'bad'}/>
      <h2>statistics</h2>
      {total === 0
        ? <p>No feedback given</p>
        : <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      }
      
    </div>
  )
}

export default App