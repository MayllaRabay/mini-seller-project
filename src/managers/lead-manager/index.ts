import type { Lead, Opportunity } from "../../types"
import { generateUUID } from "../../utils/generate-lead-uuid"

export class LeadManager {
  private leads: Lead[] = []
  private opportunities: Opportunity[] = []
  private loading = false
  private searchTerm = localStorage.getItem("searchTerm") || ""
  private filterStatus = localStorage.getItem("filterStatus") || "All"

  private listeners: Array<() => void> = []

  get isLoading() {
    return this.loading
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

  // ===== NOTIFICAÇÕES =====
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
    this.loading = true
    this.notify()

    setTimeout(() => {
      this.leads = this.leads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
      this.loading = false
      this.notify()
    }, 2000)
  }

  convertLeadToOpportunity(leadToConvert: Lead) {
    this.loading = true
    this.notify()

    setTimeout(() => {
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
