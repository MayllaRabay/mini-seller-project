import type { Lead } from "../../types"
import { Badge, Input, Select, Text } from "../../ui"

type LeadsListProps = {
  isLoading: boolean
  leads: Lead[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterStatus: string
  setFilterStatus: (status: string) => void
  onLeadClick: (lead: Lead) => void
}

export const LeadsList = ({
  isLoading,
  leads,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onLeadClick
}: LeadsListProps) => {
  const tableHeaders = ["Name", "Company", "Email", "Status", "Score", "Source"]

  return (
    <div className="lg:col-span-2 bg-secondary-50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col lg:flex-row justify-between">
        <Text
          variant="large"
          weight="semibold"
          color="dark"
          className="w-full mb-4"
        >
          Leads
        </Text>
        <div className="flex justify-end items-end gap-2 w-full mb-4 md:flex-col lg:flex-row ">
          <Input
            type="text"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 text-sm"
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-48 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
          </Select>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-500" />
        </div>
      )}

      {!isLoading && leads.length === 0 && (
        <div className="text-center p-8">
          <Text color="muted">No leads found.</Text>
        </div>
      )}

      {!isLoading && leads.length > 0 && (
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm max-h-[calc(100vh-23rem)] md:max-h-[calc(100vh-29rem)] lg:max-h-[calc(100vh-23rem)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-100 sticky top-0 z-10">
              <tr>
                {tableHeaders.map((header) => {
                  return (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left"
                    >
                      <Text
                        variant="small"
                        weight="medium"
                        color="muted"
                        className="uppercase tracking-wider"
                      >
                        {header}
                      </Text>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="bg-secondary-50 divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-secondary-100 transition-colors cursor-pointer"
                  onClick={() => onLeadClick(lead)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" weight="medium" color="dark">
                      {lead.name}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" color="secondary">
                      {lead.company}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" color="secondary">
                      {lead.email}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        lead.status === "New"
                          ? "primary"
                          : lead.status === "Contacted"
                          ? "warning"
                          : lead.status === "Qualified"
                          ? "success"
                          : "muted"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" color="primary">
                      {lead.score}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" color="primary">
                      {lead.source}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
