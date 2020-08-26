import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  let anecdotes = useSelector(state => state.anecdotes).sort((a,b) => b.votes - a.votes)
  if (filter !== "") {
    anecdotes = anecdotes.filter((a)=> a.content.includes(filter) )
  }

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(notificationSet(`you voted '${anecdote.content}'`,10))
    dispatch(increaseVote(anecdote))
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList