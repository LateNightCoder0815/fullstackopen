import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
  title: 'Component testing is done with react-testing-library',
  likes: 1234,
  author: 'Some Author',
  url: 'http://endofuniverse',
  user: {
    username : 'hellas'
  }
}

test('5.16*: Blog list tests, step4', () => {
  const mockHandler = jest.fn()
  const component = render(<BlogForm createBlog={mockHandler} />)

  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
})