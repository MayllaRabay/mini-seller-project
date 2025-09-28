import type { Lead, Opportunity } from "../../types"
import { generateUUID } from "../../utils/generate-lead-uuid"

export class LeadManager {
  private leads: Lead[] = []
  private opportunities: Opportunity[] = []
  private loading = false
  private error: string | null = null
  private success: string | null = null
  private searchTerm = localStorage.getItem("searchTerm") || ""
  private filterStatus = localStorage.getItem("filterStatus") || "All"

  private listeners: Array<() => void> = []

  get isLoading() {
    return this.loading
  }

  get lastError() {
    return this.error
  }

  get lastSuccess() {
    return this.success
  }

  clearError() {
    this.error = null
    this.notify()
  }

  clearSuccess() {
    this.success = null
    this.notify()
  }

  get allLeads() {
    return [...this.leads]
  }

  get allOpportunities() {
    return [...this.opportunities]
  }

  get filters() {
    return {
      searchTerm: this.searchTerm,
      filterStatus: this.filterStatus
    }
  }

  get filteredAndSortedLeads() {
    let filtered = [...this.leads]

    if (this.filterStatus !== "All") {
      filtered = filtered.filter((lead) => lead.status === this.filterStatus)
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(term) ||
          lead.company.toLowerCase().includes(term)
      )
    }

    return filtered.sort((a, b) => b.score - a.score)
  }

  subscribe(callback: () => void) {
    this.listeners.push(callback)
    return () => {
      const index = this.listeners.indexOf(callback)
      if (index > -1) this.listeners.splice(index, 1)
    }
  }

  private notify() {
    this.listeners.forEach((callback) => callback())
  }

  loadLeads(newLeads: Lead[]) {
    this.leads = [...newLeads]
    this.notify()
  }

  updateLead(updatedLead: Lead) {
    const originalLeads = [...this.leads]

    this.leads = this.leads.map((lead) =>
      lead.id === updatedLead.id ? updatedLead : lead
    )
    this.error = null
    this.success = null
    this.notify()

    this.loading = true
    this.notify()

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2

      if (shouldFail) {
        this.leads = originalLeads
        this.error = "Failed to update lead. Changes reverted."
        this.success = null
        setTimeout(() => {
          this.error = null
          this.notify()
        }, 5000)
      } else {
        this.error = null
        this.success = `Lead "${updatedLead.name}" updated successfully!`
        setTimeout(() => {
          this.success = null
          this.notify()
        }, 5000)
      }

      this.loading = false
      this.notify()
    }, 2000)
  }

  convertLeadToOpportunity(leadToConvert: Lead) {
    const originalLeads = [...this.leads]
    const originalOpportunities = [...this.opportunities]

    const opportunity: Opportunity = {
      id: generateUUID(),
      name: leadToConvert.name,
      stage: "Prospecting",
      amount: null,
      accountName: leadToConvert.company
    }

    this.opportunities.push(opportunity)
    this.leads = this.leads.map((lead) =>
      lead.id === leadToConvert.id
        ? { ...lead, status: "Converted" as const }
        : lead
    )
    this.error = null
    this.success = null
    this.notify()

    this.loading = true
    this.notify()

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2

      if (shouldFail) {
        this.leads = originalLeads
        this.opportunities = originalOpportunities
        this.error = "Failed to convert lead. Changes reverted."
        this.success = null
        setTimeout(() => {
          this.error = null
          this.notify()
        }, 5000)
      } else {
        this.error = null
        this.success = `Lead "${leadToConvert.name}" successfully converted to opportunity!`
        setTimeout(() => {
          this.success = null
          this.notify()
        }, 5000)
      }

      this.loading = false
      this.notify()
    }, 2000)
  }

  setSearchTerm(term: string) {
    this.searchTerm = term
    localStorage.setItem("searchTerm", term)
    this.notify()
  }

  setFilterStatus(status: string) {
    this.filterStatus = status
    localStorage.setItem("filterStatus", status)
    this.notify()
  }
}
