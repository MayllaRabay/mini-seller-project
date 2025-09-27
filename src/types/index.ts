export interface Lead {
  id: string
  name: string
  company: string
  email: string
  source: string
  score: number
  status: "New" | "Contacted" | "Qualified" | "Converted"
}

export interface Opportunity {
  id: string
  name: string
  stage: string
  amount: number | null
  accountName: string
}
