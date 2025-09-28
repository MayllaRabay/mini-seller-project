import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { LeadDetailPanel } from "./components/lead-detail-panel"
import { LeadsList } from "./components/leads-list"
import { OpportunitiesList } from "./components/opportunities-list"
import { initialLeads } from "./data"
import type { Lead, Opportunity } from "./types"
import { Text } from "./ui"
import { generateUUID } from "./utils/generate-lead-uuid"

const App: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem("searchTerm") || ""
  )
  const [filterStatus, setFilterStatus] = useState<string>(
    localStorage.getItem("filterStatus") || "All"
  )

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setLeads(initialLeads)
      setIsLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm)
  }, [searchTerm])

  useEffect(() => {
    localStorage.setItem("filterStatus", filterStatus)
  }, [filterStatus])

  const filteredAndSortedLeads = useMemo(() => {
    let filteredLeads = leads

    if (filterStatus !== "All") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.status === filterStatus
      )
    }

    if (searchTerm) {
      filteredLeads = filteredLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return [...filteredLeads].sort((a, b) => b.score - a.score)
  }, [leads, searchTerm, filterStatus])

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
    setIsLoading(true)

    setTimeout(() => {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === updatedLead.id ? updatedLead : lead
        )
      )
      setIsLoading(false)
      handlePanelClose()
    }, 1000)
  }

  const handleConvert = (leadToConvert: Lead | null) => {
    if (!leadToConvert) return

    const newOpportunity: Opportunity = {
      id: generateUUID(),
      name: leadToConvert.name,
      stage: "Prospecting",
      amount: null,
      accountName: leadToConvert.company
    }

    setOpportunities((prev) => [...prev, newOpportunity])

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadToConvert.id ? { ...lead, status: "Converted" } : lead
      )
    )

    handlePanelClose()
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
            isLoading={isLoading}
            leads={filteredAndSortedLeads}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onLeadClick={handleLeadClick}
          />
          <OpportunitiesList opportunities={opportunities} />
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
        />,
        document.body
      )}
    </div>
  )
}

export default App
