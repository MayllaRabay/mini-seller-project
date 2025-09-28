import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  LeadDetailPanel,
  LeadsList,
  OpportunitiesList,
  ToastContainer
} from "./components"
import { initialLeads } from "./data"
import { useLeadManager, useToast } from "./hooks"
import type { Lead } from "./types"
import { Text } from "./ui"

const App: React.FC = () => {
  const leadManager = useLeadManager()
  const toast = useToast()

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false)

  useEffect(() => {
    leadManager.loadLeads(initialLeads)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (leadManager.lastError) {
      toast.showError(leadManager.lastError)
    }
  }, [leadManager.lastError]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (leadManager.lastSuccess) {
      toast.showSuccess(leadManager.lastSuccess)
    }
  }, [leadManager.lastSuccess]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsPanelOpen(true)
  }

  const handlePanelClose = () => {
    setIsPanelOpen(false)
    setSelectedLead(null)
  }

  const handleSave = (updatedLead: Lead | null) => {
    if (!updatedLead) return

    leadManager.updateLead(updatedLead)
    setTimeout(() => {
      handlePanelClose()
    }, 2000)
  }

  const handleConvert = (leadToConvert: Lead | null) => {
    if (!leadToConvert) return

    leadManager.convertLeadToOpportunity(leadToConvert)
    setTimeout(() => {
      handlePanelClose()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-secondary-100 p-4 md:p-8">
      <div className="container mx-auto space-y-8">
        <header className="bg-secondary-50 rounded-lg shadow p-6">
          <Text
            as="h1"
            variant="lead"
            weight="bold"
            color="dark"
            className="text-3xl"
          >
            Mini Seller Console
          </Text>
          <Text variant="caption" color="secondary" className="mt-2">
            Manage and convert leads into opportunities.
          </Text>
        </header>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <LeadsList
            isLoading={leadManager.isLoading}
            leads={leadManager.filteredAndSortedLeads}
            searchTerm={leadManager.filters.searchTerm}
            setSearchTerm={leadManager.setSearchTerm}
            filterStatus={leadManager.filters.filterStatus}
            setFilterStatus={leadManager.setFilterStatus}
            onLeadClick={handleLeadClick}
          />
          <OpportunitiesList opportunities={leadManager.opportunities} />
        </div>
        <Text variant="caption" className="flex justify-end text-secondary-500">
          Made with 💜 by Maylla Rabay
        </Text>
      </div>

      {createPortal(
        <LeadDetailPanel
          lead={selectedLead}
          isOpen={isPanelOpen}
          onClose={handlePanelClose}
          onSave={handleSave}
          onConvert={handleConvert}
          onLoading={leadManager.isLoading}
        />,
        document.body
      )}

      {createPortal(
        <ToastContainer
          toasts={toast.toasts}
          onRemoveToast={toast.removeToast}
        />,
        document.body
      )}
    </div>
  )
}

export default App
