"use client"

export function BarList({ data, color = "bg-gray-600" }) {
  // Find the highest number to calculate relative bar widths
  // If you want it always out of 100, change this to: const maxValue = 100
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="w-full space-y-4">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-4">
          
          {/* 1. The Label (Left) */}
          <span className="w-32 text-sm font-semibold text-gray-700 truncate">
            {item.name}
          </span>

          {/* 2. The Bar (Middle) */}
          <div className="flex-1 h-4 bg-gray-100 rounded-md overflow-hidden">
            <div
              className={`h-full ${color} rounded-md transition-all duration-700 ease-in-out`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>

          {/* 3. The Number (Right) */}
          <span className="w-8 text-sm font-bold text-gray-600 text-right">
            {item.value}
          </span>
          
        </div>
      ))}
    </div>
  )
}