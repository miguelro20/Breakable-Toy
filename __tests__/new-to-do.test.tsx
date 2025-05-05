import {beforeEach, describe, expect, test, vi} from "vitest"
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { NewToDoView } from '@/app/views/todo/new-todo-view'

describe("NewToDo Component", () => {
  const mockFetchFunction = vi.fn()

  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  
  test("renders button", () => {
    render(<NewToDoView fetchFunction={mockFetchFunction}/>)
    const buttons = screen.getAllByTestId("new-todo-button")
    expect(buttons.length).toBe(1)
  })

  test("Modal Opens", () => {
    render(<NewToDoView fetchFunction={mockFetchFunction}/>)
    const button = screen.getAllByTestId("new-todo-button")[0]
    fireEvent.click(button)
    expect(screen.getByText(/Create a New ToDo/i)).toBeDefined()
  })
})