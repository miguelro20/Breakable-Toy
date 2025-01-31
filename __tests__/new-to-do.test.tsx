import {beforeEach, describe, expect, test, vi} from "vitest"
import { fireEvent, render, screen } from '@testing-library/react'
import NewToDo from '@/components/new-todo'

describe("NewToDo Component", () => {
  const mockFetchFunction= vi.fn()

  beforeEach(()=> {
    vi.clearAllMocks()
  })
  render(<NewToDo lastId={1} fetchFunction={mockFetchFunction}/>)
  
  test("renders button", ()=> {
    expect(screen.getByText(/New To Do/i)).toBeDefined()
  });
  test("Modal Opens", ()=> {
    fireEvent.click(screen.getByTestId("new-todo-button"))
    expect(screen.getByText(/Create a New ToDo/i)).toBeDefined()
  });
})