import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from "vitest";
import Message from './message'

const messageSuccessMock = {
  title: 'Fake success title',
  content: 'Content :)',
  type: 'success',
}

describe('<Message />', () => {
  it('renders with the correct title', () => {
    const handleClick = vi.fn()
    render(<Message message={messageSuccessMock} handleClose={handleClick} />)
    const title =  screen.getByText(messageSuccessMock.title)
    expect(title).toBeInTheDocument()
  })

  it('renders with the correct content', () => {
    const handleClick = vi.fn()
    render(<Message message={messageSuccessMock} handleClose={handleClick} />);
    const content = screen.getByText(messageSuccessMock.content)
    expect(content).toBeInTheDocument()
  })

  it('calls the onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<Message message={messageSuccessMock} handleClose={handleClick} disableCloseButton={false} />)
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  test('calls the onClick handler when this is disabled', () => {
    const handleClick = vi.fn()
    render(<Message message={messageSuccessMock} handleClose={handleClick} disableCloseButton={true} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

})
