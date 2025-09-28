import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { mockLeads } from "../../mocks"
import { useLeadManager } from "./index"

describe("useLeadManager Hook", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("Initialization", () => {
    it("should initialize with default values", () => {
      const { result } = renderHook(() => useLeadManager())
      expect(result.current.isLoading).toBe(false)
      expect(result.current.leads).toEqual([])
      expect(result.current.opportunities).toEqual([])
      expect(result.current.filteredAndSortedLeads).toEqual([])
      expect(result.current.filters.searchTerm).toBe("")
      expect(result.current.filters.filterStatus).toBe("All")
    })

    it("should provide all necessary functions", () => {
      const { result } = renderHook(() => useLeadManager())
      expect(typeof result.current.loadLeads).toBe("function")
      expect(typeof result.current.updateLead).toBe("function")
      expect(typeof result.current.convertLeadToOpportunity).toBe("function")
      expect(typeof result.current.setSearchTerm).toBe("function")
      expect(typeof result.current.setFilterStatus).toBe("function")
    })
  })

  describe("loadLeads functionality", () => {
    it("should load leads and update state", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
      })
      expect(result.current.leads).toHaveLength(3)
      expect(result.current.leads[0].name).toBe("John Doe")
      expect(result.current.filteredAndSortedLeads).toHaveLength(3)
    })
  })

  describe("Search functionality", () => {
    it("should update search term and re-render", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
        result.current.setSearchTerm("Doe")
      })
      expect(result.current.filters.searchTerm).toBe("Doe")
      expect(result.current.filteredAndSortedLeads).toHaveLength(1)
      expect(result.current.filteredAndSortedLeads[0].name).toBe("John Doe")
    })

    it("should persist search term in localStorage", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.setSearchTerm("test search")
      })
      expect(localStorage.getItem("searchTerm")).toBe("test search")
    })
  })

  describe("Filter functionality", () => {
    it("should update filter status and re-render", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
        result.current.setFilterStatus("Qualified")
      })
      expect(result.current.filters.filterStatus).toBe("Qualified")
      expect(result.current.filteredAndSortedLeads).toHaveLength(1)
      expect(result.current.filteredAndSortedLeads[0].status).toBe("Qualified")
    })

    it("should persist filter status in localStorage", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.setFilterStatus("New")
      })
      expect(localStorage.getItem("filterStatus")).toBe("New")
    })
  })

  describe("Combined filters", () => {
    it("should apply both search and status filters", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
        result.current.setSearchTerm("John")
        result.current.setFilterStatus("New")
      })

      expect(result.current.filteredAndSortedLeads).toHaveLength(1)
      expect(result.current.filteredAndSortedLeads[0].name).toBe("John Doe")
      expect(result.current.filteredAndSortedLeads[0].status).toBe("New")
    })
  })

  describe("Loading states", () => {
    it("should handle loading state for updateLead", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
      })
      const updatedLead = { ...mockLeads[0], name: "Updated John" }
      act(() => {
        result.current.updateLead(updatedLead)
      })
      expect(result.current.isLoading).toBe(true)
    })

    it("should handle loading state for convertLeadToOpportunity", () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
      })
      act(() => {
        result.current.convertLeadToOpportunity(mockLeads[0])
      })
      expect(result.current.isLoading).toBe(true)
    })
  })

  describe("Re-rendering behavior", () => {
    it("should re-render when manager state changes", () => {
      const { result } = renderHook(() => useLeadManager())
      const initialRender = result.current
      act(() => {
        result.current.setSearchTerm("test")
      })
      expect(result.current.filters.searchTerm).toBe("test")
      expect(result.current).not.toBe(initialRender)
    })

    it("should maintain manager instance across re-renders", () => {
      const { result, rerender } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
      })
      const leadsAfterFirstRender = result.current.leads
      rerender()
      expect(result.current.leads).toEqual(leadsAfterFirstRender)
      expect(result.current.leads).toHaveLength(3)
    })
  })

  describe("Async operations", () => {
    it("should complete updateLead operation", async () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
      })
      const updatedLead = { ...mockLeads[0], name: "Updated John" }
      act(() => {
        result.current.updateLead(updatedLead)
      })
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      })
      expect(result.current.isLoading).toBe(false)
      expect(result.current.leads[0].name).toBe("Updated John")
    })

    it("should complete convertLeadToOpportunity operation", async () => {
      const { result } = renderHook(() => useLeadManager())
      act(() => {
        result.current.loadLeads(mockLeads)
      })
      const leadToConvert = mockLeads[0]
      act(() => {
        result.current.convertLeadToOpportunity(leadToConvert)
      })
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      })
      expect(result.current.isLoading).toBe(false)
      expect(result.current.opportunities).toHaveLength(1)
      expect(result.current.opportunities[0].name).toBe(leadToConvert.name)
      const convertedLead = result.current.leads.find(
        (lead) => lead.id === leadToConvert.id
      )
      expect(convertedLead?.status).toBe("Converted")
    })
  })
})
