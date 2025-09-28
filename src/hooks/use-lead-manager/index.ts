import { useEffect, useState } from "react"
import { LeadManager } from "../../managers"
import type { Lead } from "../../types"

export function useLeadManager() {
  const [manager] = useState(() => new LeadManager())
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const unsubscribe = manager.subscribe(() => {
      forceUpdate((prev) => prev + 1)
    })
    return unsubscribe
  }, [manager])

  return {
    isLoading: manager.isLoading,
    lastError: manager.lastError,
    lastSuccess: manager.lastSuccess,
    leads: manager.allLeads,
    opportunities: manager.allOpportunities,
    filters: manager.filters,
    filteredAndSortedLeads: manager.filteredAndSortedLeads,

    loadLeads: (leads: Lead[]) => manager.loadLeads(leads),
    updateLead: (lead: Lead) => manager.updateLead(lead),
    convertLeadToOpportunity: (lead: Lead) =>
      manager.convertLeadToOpportunity(lead),
    setSearchTerm: (term: string) => manager.setSearchTerm(term),
    setFilterStatus: (status: string) => manager.setFilterStatus(status),
    clearError: () => manager.clearError(),
    clearSuccess: () => manager.clearSuccess()
  }
}
