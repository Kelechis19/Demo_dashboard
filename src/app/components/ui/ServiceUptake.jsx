"use client"
import { BarList } from "./BarList"

const serviceData = [
  { name: "Counselling", value: 75 },
  { name: "Career Level", value: 63 },
  { name: "Financial Lit", value: 38 },
  { name: "Land-based", value: 15 },
]

export const ServiceUptake = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full ">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-700">Service Uptake</h3>
      </div>
      
      {/* We use the component we just built, passing the gray color from your design */}
      <BarList className="space-y-3" data={serviceData} color="bg-gray-500"/>
    </div>
  )
}