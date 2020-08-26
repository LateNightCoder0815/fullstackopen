 const notificationReducer = (state = "", action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      default:
        return state
    }
  }
  
  let id = 0
  export const notificationSet = (notification, sec) => {
    return async dispatch => {
      clearTimeout(id)
      id = setTimeout(() => dispatch(notificationRemove()), sec * 1000)
      dispatch({
        type: 'SET_NOTIFICATION',
        notification
      })
    }
  }
  

  export const notificationRemove = () => {
    return {
      type: 'SET_NOTIFICATION',
      notification: ''
    }
  }
  
  export default notificationReducer