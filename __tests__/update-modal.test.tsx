import {beforeEach, describe, expect, test, vi} from "vitest"
import { fireEvent, render, screen } from '@testing-library/react'
import NewToDo from '@/components/new-todo'
import UpdateModal from "@/components/update-modal"
import { ToDo } from "@/app/interfaces/to-do"

describe("Update Modal Component", () => {
  const mockFetchFunction= vi.fn()

  beforeEach(()=> {
    vi.clearAllMocks()
  })
  const content= [{id:1, name: "Task 1", description: "test task", priority: "High", dueDate: "2025-10-25", creationDate:"2025-10-25"}]
  render(<UpdateModal todo={content as unknown as ToDo} isOpen={true} onClose={mockFetchFunction} fetchFunction={mockFetchFunction}/>)
  
  test("update modal render", ()=> {
    expect(screen.getByText(/Update To Do/i)).toBeDefined()
  });
})