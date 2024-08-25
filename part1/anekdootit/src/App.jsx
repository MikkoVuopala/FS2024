import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const zeros = new Array(8).fill(0)
  const [votes, setVotes] = useState([...zeros])

  console.log(votes)

  const nextAnecdote = () => {
    if (selected < anecdotes.length - 1)  {
      setSelected(selected + 1)
    } else {
      setSelected(0)
    }
  } 

  const voteAnecdote = () => {
    const voteCopy = [...votes]
    voteCopy[selected] += 1
    setVotes(voteCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="Vote"/>
      <Button handleClick={nextAnecdote} text="Next Anecdote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[Math.max(...votes)]} votes</p>
    </div>
  )
}

export default App
