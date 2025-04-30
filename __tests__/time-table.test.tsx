import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import { TimeTableView } from "@/app/views/todo/time-table-view"

describe("TimeTable Component", () => {
  const mockMetrics = {
    totalAverage: 5,
    highAverage: 10,
    mediumAverage: 20,
    lowAverage: 2
  }

  beforeEach(() => {
    vi.clearAllMocks()
    render(<TimeTableView metrics={mockMetrics}/>)
  })
  
  test("renders metrics", () => {
    expect(screen.getByTestId("time-table")).toBeDefined()
    expect(screen.getByText(/5/i)).toBeDefined()
  })
})