"use client"

import { DonutChart } from "./DonutChart"

// Data matching the "Budget" section in your image
const budgetData = [
  { 
    name: "Youth Training", 
    amount: 45, 
    color: "#6b7280" // Dark Gray
  },
  { 
    name: "Mental Health", 
    amount: 25, 
    color: "#9ca3af" // Medium Gray
  },
  { 
    name: "Cultural Events", 
    amount: 20, 
    color: "#d1d5db" // Light Gray
  },
  { 
    name: "Admin & Staff", 
    amount: 10, 
    color: "#f3f4f6" // Very Light Gray
  },
]

export const DonutChartHero = () => (
  <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    
    {/* Header Section */}
    <div className="mb-6">
      <h3 className="text-gray-600 font-semibold mb-1">Budget</h3>
      <h2 className="text-3xl font-bold text-gray-500">$450,000 CAD</h2>
    </div>

    {/* Chart Section with Overlay */}
    <div className="relative flex items-center justify-center">
      <DonutChart
        data={budgetData}
        category="name"
        value="amount"
        valueFormatter={(number) => `${number}%`}
      />
      
      {/* The Centered "45%" Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-4xl font-bold text-gray-800">45%</span>
      </div>
    </div>

    {/* Custom Legend Section */}
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
      {budgetData.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          {/* The colored square box */}
          <span 
            className="w-3 h-3 rounded-sm" 
            style={{ backgroundColor: item.color }} 
          />
          <span className="text-sm text-gray-600 font-medium">
            {item.name}
          </span>
        </div>
      ))}
    </div>

  </div>
)