import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import { ToDoTableView } from "@/app/views/todo/todo-table-view"
import { ToDo } from "@/app/interfaces/to-do"

describe("ToDo Table Component", () => {
  const mockFunction = vi.fn()
  const content = [{
    id: 1, 
    name: "Task 1", 
    description: "test task", 
    priority: "High", 
    status: "false",
    dueDate: new Date("2025-10-25"), 
    doneDate: null,
    creationDate: "2025-10-25"
  }]
  const totalPages = 1

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <ToDoTableView 
        toDos={content} 
        totalPages={totalPages} 
        onPageChange={mockFunction} 
        fetchFunction={mockFunction}
      />
    )
  })
  
  test("renders to do table", () => {
    expect(screen.getByText(/Task 1/i)).toBeDefined()
  })
})

