import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import TimeTable from "@/components/ttf-table"
import { ToDoTable } from "@/components/todo-table"
import { ToDo } from "@/app/interfaces/to-do"

describe("To Do Table Component", () => {
    const mockFunction= vi.fn()
    const content= [{id:1, name: "Task 1", description: "test task", priority: "High", dueDate: "2025-10-25", creationDate:"2025-10-25"}]
    const totalPages= 1

  beforeEach(()=> {
    vi.clearAllMocks()
  })
  render(<ToDoTable toDos={content as unknown as ToDo[]} totalPages={totalPages} onPageChange={mockFunction} fetchFunction={mockFunction}/>)
  
  test("renders to do table", ()=> {
    expect(screen.getByText(/Task 1/i)).toBeDefined()
  });
})

