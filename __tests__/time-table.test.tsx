import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen } from '@testing-library/react'
import TimeTable from "@/components/ttf-table"

describe("Metrics Component", () => {
  const mockMetrics= {
    totalAverage: 5,
    highAverage: 10,
    mediumAverage: 20,
    lowAverage: 2
}

  beforeEach(()=> {
    vi.clearAllMocks()
  })
  render(<TimeTable metrics={mockMetrics}/>)
  
  test("renders metrics", ()=> {
    expect(screen.getByText(/5/i)).toBeDefined()
  });
})