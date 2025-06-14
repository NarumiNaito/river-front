export interface WaterRow {
  date: string
  time: string
  value: string
  flag: string
  [key: string]: string
}

export interface WaterResponse {
  metadata: Record<string, string>
  data: WaterRow[]
}

export interface WaterChartData {
  dateTime: Date
  formattedDate: string
  value: number
  [key: string]: unknown
}

export type NavItem = {
  title: string
  href: string
}

export type ContentConfig = NavItem[]
