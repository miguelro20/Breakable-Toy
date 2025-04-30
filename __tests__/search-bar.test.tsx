import {beforeEach, describe, expect, test, vi} from "vitest"
import { render, screen } from '@testing-library/react'
import { SearchBarView } from "@/app/views/todo/search-bar-view"

describe("SearchBar Component", () => {
  const mockOnClear = vi.fn()
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    render(<SearchBarView onClear={mockOnClear} onSearch={mockOnSearch}/>)
  })
  
  test("renders SearchBar", () => {
    expect(screen.getByTestId("search-bar")).toBeDefined()
  })
})