"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

// Fallback colors if none are provided in data
const defaultColors = ["#3b82f6", "#ef4444", "#22c55e", "#eab308", "#8b5cf6", "#ec4899", "#f97316"]

export function DonutChart({ data, category, value, valueFormatter, variant = "donut" }) {
  const isDonut = variant === "donut"
  
  return (
    // Increased height slightly to match the UI better
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isDonut ? 70 : 0} 
            outerRadius={90}
            stroke="none" // Removes the white border between slices for a cleaner look
            paddingAngle={0}
            dataKey={value}
          >
            {data.map((entry, index) => (
              // CHANGE: We now check if the data item has a 'color' property first
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || defaultColors[index % defaultColors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(val) => valueFormatter ? valueFormatter(val) : val}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}