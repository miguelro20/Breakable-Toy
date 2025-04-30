import {beforeEach, describe, expect, test, vi} from "vitest"
import { render, screen } from '@testing-library/react'
import { UpdateModalView } from "@/app/views/todo/update-modal-view"
import { ToDo } from "@/app/interfaces/to-do"

describe("Update Modal Component", () => {
  const mockFetchFunction = vi.fn()
  const todo = {
    id: 1, 
    name: "Task 1", 
    description: "test task", 
    priority: "High", 
    status: "false",
    dueDate: new Date("2025-10-25"), 
    doneDate: null,
    creationDate: "2025-10-25"
  }

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <UpdateModalView 
        todo={todo} 
        isOpen={true} 
        onClose={mockFetchFunction} 
        fetchFunction={mockFetchFunction}
      />
    )
  })
  
  test("update modal render", () => {
    // Test for the dialog element using role
    expect(screen.getByRole("dialog")).toBeDefined()
    // Test for the title
    expect(screen.getByText(/Update To Do/i)).toBeDefined()
    // Test for the name input
    expect(screen.getByDisplayValue("Task 1")).toBeDefined()
  })
})