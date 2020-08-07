const dummy = (blogs) => {
  if (blogs !== undefined){
    return 1
  }
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  if (likes.length === 0) {
    return 0
  } else {
    return likes.reduce((acc,val) => acc + val)
  }
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((acc, val) => (val.likes > acc.likes) ? val : acc, { 'likes': 0 })
  delete result.__v
  delete result._id
  delete result.url
  return result
}

const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((acc,val) => {
    const idx = acc.findIndex(blog => blog.author === val.author)
    if (idx !== -1) {
      acc[idx].blogs += 1
    }else{
      acc.push({ author: val.author, blogs: 1 })
    }
    return acc
  },[])

  return authorCount.reduce((acc,val) =>
    (val.blogs > acc.blogs) ?val :acc ,{ 'blogs': 0 })
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((acc,val) => {
    const idx = acc.findIndex(blog => blog.author === val.author)
    if (idx !== -1) {
      acc[idx].likes += val.likes
    }else{
      acc.push({ author: val.author, likes: val.likes })
    }
    return acc
  },[])

  return authorLikes.reduce((acc,val) =>
    (val.likes > acc.likes) ?val :acc ,{ 'likes': 0 })
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}