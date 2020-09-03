const userReducer = (state = null, action) => {
  switch(action.type){
    case 'SET':
      return action.data
    default: return state
  }
}




export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: user,
    })
  }
}


export default userReducer