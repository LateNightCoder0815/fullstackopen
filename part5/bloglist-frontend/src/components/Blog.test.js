import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  likes: 1234,
  author: 'Some Author',
  url: 'http://endofuniverse',
  user: {
    username : 'hellas'
  }
}

const user = {
  username : 'hellas'
}

test('5.13: Blog list tests, step1', () => {
  const component = render(<Blog blog={blog} user={user} />)

  // title & author
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  // not render its url or number of likes by default
  const div = component.container.querySelector('.blogDetails')
  expect(div).toHaveStyle('display: none')
})

test('5.14: Blog list tests, step2', () => {
  const component = render(<Blog blog={blog} user={user} />)
  fireEvent.click(component.getByText('view'))

  // title & author
  expect(component.container).toHaveTextContent(blog.likes)
  expect(component.container).toHaveTextContent(blog.url)
  // not render its url or number of likes by default
  const div = component.container.querySelector('.blogDetails')
  expect(div).not.toHaveStyle('display: none')
})

test('5.15: Blog list tests, step3', () => {
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} handleLike={mockHandler}/>)
  fireEvent.click(component.getByText('like'))
  fireEvent.click(component.getByText('like'))

  expect(mockHandler.mock.calls).toHaveLength(2)
})