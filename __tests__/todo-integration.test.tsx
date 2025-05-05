import { beforeEach, describe, expect, test, vi } from "vitest"
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NewToDoView } from '@/app/views/todo/new-todo-view'
import { ToDoTableView } from '@/app/views/todo/todo-table-view'
import { createTodo } from '@/app/controllers/todo-controller'

// Mock the createTodo function
vi.mock('@/app/controllers/todo-controller', () => ({
  createTodo: vi.fn()
}))

describe("ToDo Integration", () => {
  const mockFetchFunction = vi.fn()
  const mockToDos = [{
    id: 1,
    name: "Existing Task",
    description: "test task",
    priority: "High",
    status: "false",
    dueDate: new Date("2025-10-25"),
    doneDate: null,
    creationDate: "2025-10-25"
  }]

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock successful createTodo response
    ;(createTodo as any).mockResolvedValue({
      id: 2,
      name: "New Task",
      description: "new task",
      priority: "Medium",
      status: "false",
      dueDate: new Date("2025-10-26"),
      doneDate: null,
      creationDate: new Date().toISOString()
    })
  })

  test("creates a new todo and updates the table", async () => {
    // Render both components
    render(
      <div>
        <NewToDoView fetchFunction={mockFetchFunction} />
        <ToDoTableView 
          toDos={mockToDos} 
          totalPages={1} 
          onPageChange={vi.fn()} 
          fetchFunction={mockFetchFunction}
        />
      </div>
    )

    // Open the new todo modal
    const newTodoButton = screen.getAllByTestId("new-todo-button")[0]
    fireEvent.click(newTodoButton)

    // Fill in the form
    const nameInput = screen.getByPlaceholderText("Enter Name")
    const descriptionInput = screen.getByPlaceholderText("Enter Description (max 120 chars.)")
    const submitButton = screen.getByText("Submit")

    fireEvent.change(nameInput, { target: { value: "New Task" } })
    fireEvent.change(descriptionInput, { target: { value: "new task" } })

    // Submit the form
    fireEvent.click(submitButton)

    // Wait for the createTodo function to be called
    await waitFor(() => {
      expect(createTodo).toHaveBeenCalledWith({
        name: "New Task",
        description: "new task",
        priority: "",
        status: "false",
        dueDate: undefined,
        creationDate: expect.any(String)
      })
    })

    // Verify that fetchFunction was called to refresh the table
    expect(mockFetchFunction).toHaveBeenCalled()
  })

  test("handles error when creating todo fails", async () => {
    // Mock failed createTodo response
    ;(createTodo as any).mockRejectedValue(new Error("Failed to create todo"))

    // Render both components
    render(
      <div>
        <NewToDoView fetchFunction={mockFetchFunction} />
        <ToDoTableView 
          toDos={mockToDos} 
          totalPages={1} 
          onPageChange={vi.fn()} 
          fetchFunction={mockFetchFunction}
        />
      </div>
    )

    // Open the new todo modal
    const newTodoButton = screen.getAllByTestId("new-todo-button")[0]
    fireEvent.click(newTodoButton)

    // Fill in the form
    const nameInput = screen.getByPlaceholderText("Enter Name")
    const descriptionInput = screen.getByPlaceholderText("Enter Description (max 120 chars.)")
    const submitButton = screen.getByText("Submit")

    fireEvent.change(nameInput, { target: { value: "New Task" } })
    fireEvent.change(descriptionInput, { target: { value: "new task" } })

    // Submit the form
    fireEvent.click(submitButton)

    // Wait for the error to be handled
    await waitFor(() => {
      expect(createTodo).toHaveBeenCalled()
      expect(mockFetchFunction).not.toHaveBeenCalled()
    })
  })
}) 