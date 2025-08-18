import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // initial_random has been defined as it is good to use a random value as the initial value of the
  // state variable "selected" instead of a statis value 0 or any other fixed value.

  const initial_random = Math.floor(Math.random() * ((anecdotes.length - 1) - 0 + 1)) + 0
  const initial_object = {}

  // initial_object will be in structure of {"0": 0,"1": 0,"2": 0,"3": 0,"4": 0,"5": 0,"6": 0,"7": 0}
  // when initial_object will be set to votes using useState, we have initial value of votes with
  // every anecdotes with vote value as 0. So that we can show the 0 votes for every  anecdote shown
  // in the page for the first time including the time when the page loads for the first time.

  for (let i = 0; i <anecdotes.length; i ++) {
    initial_object[i] = 0
  }

  const [selected, setSelected] = useState(initial_random)
  const [votes, setVotes] = useState(initial_object)
  const [popularVote, setPopularVote] = useState(initial_random)

  // "store_votes" has been created so that we can diretly update it in the "handle_vote" function as
  //  we can not drectly update the state variable "votes".

  const store_votes = {...votes}

  const set_random = () => {
    const random_num = Math.floor(Math.random() * ((anecdotes.length - 1) - 0 + 1)) + 0
    setSelected(random_num)
  }

  const handle_vote = () => {
    if (!(selected in store_votes)){
      store_votes[selected] = 1
      setVotes(store_votes)
      FindMax()
    } else {
      store_votes[selected] += 1
      setVotes(store_votes)
      FindMax()
    }
  }

  // FindMax() is finding the element with the maximum number of votes from store_votes
  // then we are setting the state variable "popularVote" with the element.
  // this "popularVote" will be used to show the anecdote with most votes and the number of votes
  // within the jsx section.
  // FindMax() has been set to be called inside of handle_vote() so that whenever the "vote" button
  // is pressed along with storing the votes inside "store_votes" object, we also find the max vote
  // and set the value of "popularVote" state variable.

  const FindMax = () => {
    let maxVal = Math.max(...(Object.values(store_votes)))
    let maxElement = 0

    for (let key in store_votes){
      if (store_votes[key] == maxVal){
        maxElement = Number(key)
      }
    }
    setPopularVote(maxElement)
}

  // Conditional (ternary) operator (? :) used in the below jsx, where by "votes === initial_object"
  // we are checking if any votes has been given yet or not. If "votes === initial_object" is true, then
  // that means we are at initial state and no vote has been given yet in any anecdotes.

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {store_votes[selected]} votes</p>
      <button onClick={handle_vote}>vote</button>
      <button onClick={set_random}>next anecdote</button><br/>
      {votes === initial_object
        ? <h2>No votes has been given yet</h2>
        : <>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[popularVote]}</p>
            <p>has {store_votes[popularVote]} votes</p>
          </>
      }
    </div>
  )
}

export default App
