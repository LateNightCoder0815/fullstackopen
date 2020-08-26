import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes : anecdoteToChange.votes + 1 }
      return state.map(n => n.id === id ? changedAnecdote : n)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTE':
      return action.data
    default: return state
  }
}

export const increaseVote = anecdote => {
  return async dispatch => {
    const changedAnecdote = { ...anecdote, votes : anecdote.votes + 1 }
    const newAnecdote = await anecdoteService.change(changedAnecdote, changedAnecdote.id)
    dispatch({
      type: 'VOTE',
      data: newAnecdote,
    })
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}


export const initAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer