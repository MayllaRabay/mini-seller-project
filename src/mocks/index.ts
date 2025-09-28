import type { Lead } from "../types"

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    company: "Tech Corp",
    email: "john@techcorp.com",
    status: "New",
    score: 85,
    source: "Website"
  },
  {
    id: "2",
    name: "Jane Smith",
    company: "Design Studio",
    email: "jane@design.com",
    status: "Qualified",
    score: 92,
    source: "Referral"
  },
  {
    id: "3",
    name: "Bob Johnson",
    company: "Marketing Inc",
    email: "bob@marketing.com",
    status: "Contacted",
    score: 78,
    source: "LinkedIn"
  }
]
