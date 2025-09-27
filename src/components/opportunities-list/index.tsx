import type { Opportunity } from "../../types"
import { Text } from "../../ui"

type OpportunitiesListProps = {
  opportunities: Opportunity[]
}

export const OpportunitiesList = ({
  opportunities
}: OpportunitiesListProps) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 h-fit">
      <Text variant="large" weight="semibold" color="dark" className="mb-4">
        Opportunities
      </Text>
      {opportunities.length === 0 ? (
        <div className="text-center p-8">
          <Text color="muted">No opportunities yet.</Text>
        </div>
      ) : (
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm max-h-[calc(100vh-21rem)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left"
                >
                  <Text variant="small" weight="medium" color="muted" className="uppercase tracking-wider">
                    Name
                  </Text>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left"
                >
                  <Text variant="small" weight="medium" color="muted" className="uppercase tracking-wider">
                    Account
                  </Text>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left"
                >
                  <Text variant="small" weight="medium" color="muted" className="uppercase tracking-wider">
                    Stage
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {opportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" weight="medium" color="dark">
                      {opp.name}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" color="secondary">
                      {opp.accountName}
                    </Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text variant="caption" color="secondary">
                      {opp.stage}
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
