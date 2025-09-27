import { useEffect, useState } from "react"
import type { Lead } from "../../types"
import { Button, Input, Label, Select, Text } from "../../ui"

type LeadDetailPanelProps = {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onSave: (lead: Lead | null) => void
  onConvert: (lead: Lead | null) => void
}

export const LeadDetailPanel = ({
  lead,
  isOpen,
  onClose,
  onSave,
  onConvert
}: LeadDetailPanelProps) => {
  const [editingLead, setEditingLead] = useState<Lead | null>(lead)
  const [emailError, setEmailError] = useState<string>("")

  useEffect(() => {
    if (!lead) {
      setEditingLead(null)
    } else {
      setEmailError("")
      setEditingLead(lead)
    }
  }, [lead])

  if (!lead && !isOpen) return null

  const handleEditLead = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditingLead((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSaveLead = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editingLead?.email || "")) {
      setEmailError("Invalid email format")
      return
    }
    setEmailError("")
    onSave(editingLead)
  }

  const handleConvertLead = () => {
    onConvert(editingLead)
  }

  const handleOnClose = () => {
    onClose()
    setEmailError("")
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleOnClose}
      ></div>

      <div
        className={`absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-1/3 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full bg-gray-50 p-6 rounded-l-lg">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <Text as="h2" variant="large" weight="semibold" color="dark">
              {lead?.name || "Lead Details"}
            </Text>
            <Button
              onClick={handleOnClose}
              variant="ghost"
              size="sm"
              className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 focus-visible:ring-0 p-1"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          <div className="mt-6 flex-grow overflow-y-auto">
            <Text variant="caption" color="muted" className="mb-4">
              ID: {lead?.id}
            </Text>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={editingLead?.email || ""}
                  onChange={handleEditLead}
                  variant={emailError ? "error" : "default"}
                  error={emailError}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  name="status"
                  value={
                    lead?.status === "Converted"
                      ? "Converted"
                      : editingLead?.status || "New"
                  }
                  onChange={handleEditLead}
                  disabled={lead?.status === "Converted"}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted" hidden>
                    Converted
                  </option>
                </Select>
              </div>

              <div>
                <Label>Company</Label>
                <Text variant="caption" color="primary" className="mt-1">
                  {lead?.company}
                </Text>
              </div>
              <div>
                <Label>Source</Label>
                <Text variant="caption" color="primary" className="mt-1">
                  {lead?.source}
                </Text>
              </div>
              <div>
                <Label>Score</Label>
                <Text variant="caption" color="primary" className="mt-1">
                  {lead?.score}
                </Text>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={handleConvertLead}
                  disabled={lead?.status === "Converted"}
                  variant={
                    lead?.status === "Converted" ? "secondary" : "primary"
                  }
                  className="w-full"
                >
                  Convert to Opportunity
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button onClick={handleOnClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSaveLead} variant="primary">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
