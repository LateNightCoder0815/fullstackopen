import blogService from '../services/blogs'
import { notificationSet } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type){
    case 'LIKE':
      const id = action.data.id
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { ...blogToChange, likes : blogToChange.likes + 1 }
      return state.map(n => n.id === id ? changedBlog : n)
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOG':
      return action.data
    case 'REMOVE_BLOG':
      return state.filter(n => n.id !== action.data.id)
    default: return state
  }
}

export const increaseLike = blog => {
  return async dispatch => {
    const changedBlog = { ...blog, likes : blog.likes + 1 }
    try {
      const newBlog = await blogService.change(changedBlog, changedBlog.id)
      dispatch({
        type: 'LIKE',
        data: newBlog,
      })
      dispatch(notificationSet({ message: `Added one like to ${newBlog.title} by ${newBlog.author}`, type: 'success' },5))
    }catch(exception) {
      dispatch(notificationSet({ message: 'Failed to add like', type: 'error' },5))
    }
  }
}


export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(notificationSet({ message: `A new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' },5))
    }catch(exception) {
      dispatch(notificationSet({ message: 'Failed to add blog', type: 'error' },5))
    }
  }
}


export const initBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sorted_blogs = blogs.sort((a,b) => b.likes - a.likes )
    dispatch({
      type: 'INIT_BLOG',
      data: sorted_blogs,
    })
  }
}


export const removeBlog = blogObject => {
  return async dispatch => {
    try {
      await blogService.remove(blogObject.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogObject,
      })
      dispatch(notificationSet({ message: `Removed ${blogObject.title} by ${blogObject.author}`, type: 'success' },5))
    }catch(exception) {
      dispatch(notificationSet({ message: 'Failed to remove blog', type: 'error' },5))
    }
  }
}

export default blogReducer