"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUp } from "lucide-react" // Icons for the trend

const kpiData = [
  {
    kpi: "Intake Completion (%)",
    may: 85,
    june: 82,
    july: 78,
    trend: "+7 pts",
    trendDir: "up",
  },
  {
    kpi: "Mental Health Improvement",
    may: 3.9,
    june: 3.6,
    july: 3.4,
    trend: "+0.5",
    trendDir: "up",
  },
  {
    kpi: "Cultural Participation (%)",
    may: 41,
    june: 43,
    july: 39,
    trend: "+2 pts",
    trendDir: "up",
  },
]

export function KPIScorecard() {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-700">KPI Scorecards</h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] text-gray-900 font-semibold">KPI</TableHead>
            <TableHead className="text-gray-900 font-semibold">May</TableHead>
            <TableHead className="text-gray-900 font-semibold">June</TableHead>
            <TableHead className="text-gray-900 font-semibold">July</TableHead>
            <TableHead className="text-gray-900 font-semibold">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kpiData.map((item) => (
            <TableRow key={item.kpi} className="border-gray-100 ">
              <TableCell className="font-medium text-gray-600">{item.kpi}</TableCell>
              <TableCell className="text-gray-600">{item.may}</TableCell>
              <TableCell className="text-gray-600">{item.june}</TableCell>
              <TableCell className="text-gray-600">{item.july}</TableCell>
              <TableCell>
                <div className="flex items-center  gap-1 font-medium text-gray-700">
                  <ArrowUp className="h-4 w-4" />
                  {item.trend}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}