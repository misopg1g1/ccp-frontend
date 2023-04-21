import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Message from './message'


const messageSuccessMock = {
  title: 'Fake success title',
  content: 'Content :)',
  type: 'success',
  timeout: 10000,
}

describe('<Message />', () => {
  test('renders with the correct title', () => {
    const { getByText } = render(<Message message={messageSuccessMock} />)
    const title = getByText(messageSuccessMock.title)
    expect(title).toBeInTheDocument()
  })

  test('renders with the correct content', () => {
    const { getByText } = render(<Message message={messageSuccessMock} />)
    const content = getByText(messageSuccessMock.content)
    expect(content).toBeInTheDocument()
  })

  test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Message message={messageSuccessMock} handleClose={handleClick} />)
    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  test('calls the onClick handler when this is disabled', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Message message={messageSuccessMock} handleClose={handleClick} disableCloseButton={true} />)
    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

})
