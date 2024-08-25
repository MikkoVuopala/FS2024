import { useState } from 'react'

const Header = () => <h1>Give feedback</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  if (props.text === "Positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({g,n,b}) => {
  const total = g+n+b
  if(total !== 0) {
    const avg = (g + n*0 + b*-1) / total
    const pos = (g / total) * 100 
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={g}/>
            <StatisticLine text="Neutral" value={n}/>
            <StatisticLine text="Bad" value={b}/>
            <StatisticLine text="All" value={total}/>
            <StatisticLine text="Average" value={avg}/>
            <StatisticLine text="Positive" value={pos}/>
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback given.</p>
    </div>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Statistics g={good} n={neutral} b={bad}/>
    </div>
  )
}

export default App
