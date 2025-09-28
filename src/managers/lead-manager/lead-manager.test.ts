import { beforeEach, describe, expect, it } from "vitest"
import { mockLeads } from "../../mocks"
import { LeadManager } from "./index"

describe("LeadManager", () => {
  let manager: LeadManager

  beforeEach(() => {
    manager = new LeadManager()
    localStorage.clear()
  })

  describe("Initialization", () => {
    it("should initialize with empty state", () => {
      expect(manager.isLoading).toBe(false)
      expect(manager.allLeads).toEqual([])
      expect(manager.allOpportunities).toEqual([])
      expect(manager.filters.searchTerm).toBe("")
      expect(manager.filters.filterStatus).toBe("All")
    })

    it("should load filters from localStorage if available", () => {
      localStorage.setItem("searchTerm", "saved search")
      localStorage.setItem("filterStatus", "New")
      const newManager = new LeadManager()
      expect(newManager.filters.searchTerm).toBe("saved search")
      expect(newManager.filters.filterStatus).toBe("New")
    })
  })

  describe("loadLeads", () => {
    it("should load leads into manager", () => {
      manager.loadLeads(mockLeads)
      expect(manager.allLeads).toHaveLength(3)
      expect(manager.allLeads[0].name).toBe("John Doe")
    })
  })

  describe("filteredAndSortedLeads getter", () => {
    beforeEach(() => {
      manager.loadLeads(mockLeads)
      manager.setSearchTerm("")
      manager.setFilterStatus("All")
    })

    it("should return all leads when no filters applied", () => {
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(3)
    })

    it("should sort leads by score descending", () => {
      const filtered = manager.filteredAndSortedLeads
      expect(filtered[0].score).toBe(92)
      expect(filtered[1].score).toBe(85)
      expect(filtered[2].score).toBe(78)
    })

    it("should filter by search term (name)", () => {
      manager.setSearchTerm("Doe")
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(1)
      expect(filtered[0].name).toBe("John Doe")
    })

    it("should filter by search term (company)", () => {
      manager.setSearchTerm("Design")
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(1)
      expect(filtered[0].company).toBe("Design Studio")
    })

    it("should filter by search term case insensitive", () => {
      manager.setSearchTerm("TECH")
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(1)
      expect(filtered[0].company).toBe("Tech Corp")
    })

    it("should filter by status", () => {
      manager.setFilterStatus("Qualified")
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(1)
      expect(filtered[0].status).toBe("Qualified")
    })

    it("should combine search and status filters", () => {
      manager.setSearchTerm("John")
      manager.setFilterStatus("New")
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(1)
      expect(filtered[0].name).toBe("John Doe")
      expect(filtered[0].status).toBe("New")
    })

    it("should return empty array when no matches", () => {
      manager.setSearchTerm("NonExistent")
      const filtered = manager.filteredAndSortedLeads
      expect(filtered).toHaveLength(0)
    })
  })

  describe("setSearchTerm", () => {
    it("should update search term", () => {
      manager.setSearchTerm("test search")
      expect(manager.filters.searchTerm).toBe("test search")
    })

    it("should save search term to localStorage", () => {
      manager.setSearchTerm("test search")
      expect(localStorage.getItem("searchTerm")).toBe("test search")
    })

    it("should notify listeners when search term changes", () => {
      let notified = false
      manager.subscribe(() => {
        notified = true
      })
      manager.setSearchTerm("test")
      expect(notified).toBe(true)
    })
  })

  describe("setFilterStatus", () => {
    it("should update filter status", () => {
      manager.setFilterStatus("Qualified")
      expect(manager.filters.filterStatus).toBe("Qualified")
    })

    it("should save filter status to localStorage", () => {
      manager.setFilterStatus("Qualified")
      expect(localStorage.getItem("filterStatus")).toBe("Qualified")
    })

    it("should notify listeners when filter status changes", () => {
      let notified = false
      manager.subscribe(() => {
        notified = true
      })
      manager.setFilterStatus("New")
      expect(notified).toBe(true)
    })
  })

  describe("updateLead", () => {
    beforeEach(() => {
      manager.loadLeads(mockLeads)
    })

    it("should set loading to true initially", () => {
      const updatedLead = { ...mockLeads[0], name: "Updated Name" }
      manager.updateLead(updatedLead)
      expect(manager.isLoading).toBe(true)
    })

    it("should update lead after timeout", async () => {
      const updatedLead = { ...mockLeads[0], name: "Updated Name" }
      manager.updateLead(updatedLead)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const leads = manager.allLeads
      const updated = leads.find((lead) => lead.id === "1")
      expect(updated?.name).toBe("Updated Name")
      expect(manager.isLoading).toBe(false)
    })
  })

  describe("convertLeadToOpportunity", () => {
    beforeEach(() => {
      manager.loadLeads(mockLeads)
    })

    it("should set loading to true initially", () => {
      manager.convertLeadToOpportunity(mockLeads[0])
      expect(manager.isLoading).toBe(true)
    })

    it("should create opportunity and update lead status after timeout", async () => {
      const leadToConvert = mockLeads[0]
      manager.convertLeadToOpportunity(leadToConvert)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const opportunities = manager.allOpportunities
      expect(opportunities).toHaveLength(1)
      expect(opportunities[0].name).toBe(leadToConvert.name)
      expect(opportunities[0].stage).toBe("Prospecting")
      expect(opportunities[0].accountName).toBe(leadToConvert.company)
      const leads = manager.allLeads
      const convertedLead = leads.find((lead) => lead.id === leadToConvert.id)
      expect(convertedLead?.status).toBe("Converted")
      expect(manager.isLoading).toBe(false)
    })
  })
})
