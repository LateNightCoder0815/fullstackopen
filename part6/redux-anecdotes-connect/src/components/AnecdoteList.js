import React from 'react'
import { connect } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  let anecdotes = props.anecdotes.sort((a,b) => b.votes - a.votes)
  if (props.filter !== "") {
    anecdotes = anecdotes.filter((a)=> a.content.includes(props.filter) )
  }
  const handleVote = (anecdote) => {
    props.notificationSet(`you voted '${anecdote.content}'`,5)
    props.increaseVote(anecdote)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps,{ notificationSet, increaseVote })(AnecdoteList)

export default ConnectedAnecdoteList