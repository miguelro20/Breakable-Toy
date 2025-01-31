import {beforeEach, describe, expect, test, vi} from "vitest"
import { fireEvent, render, screen } from '@testing-library/react'
import NewToDo from '@/components/new-todo'
import SearchBar from "@/components/search-bar"

describe("NewToDo Component", () => {
  const mockOnClear= vi.fn()
  const mockOnSearch= vi.fn()

  beforeEach(()=> {
    vi.clearAllMocks()
  })
  render(<SearchBar onClear={mockOnClear} onSearch={mockOnSearch}/>)
  
  test("renders SearchBar", ()=> {
    expect(screen.getByTestId("search-bar")).toBeDefined()
  });
})