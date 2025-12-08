"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  ChevronDown,
  RotateCcw
} from "lucide-react";
// Importing Recharts directly since we are defining the component locally to avoid import errors
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

// --- 1. Local Chart Component (To fix import error) ---

const DonutChart = ({ data, category, value, valueFormatter }) => {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey={value}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <RechartsTooltip 
            formatter={(val) => valueFormatter ? valueFormatter(val) : val}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Centered Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-gray-800">45%</span>
      </div>
    </div>
  );
};

// --- 2. Data ---

const budgetBreakdownData = [
  { name: "Youth Training", amount: 83, color: "#4b5563" }, // dark gray
  { name: "Mental Health", amount: 67, color: "#9ca3af" }, // medium gray
  { name: "Cultural Events", amount: 86, color: "#d1d5db" }, // light gray
  { name: "Admin & Staff", amount: 100, color: "#e5e7eb" }, // lighter gray
];

const budgetVsSpentData = [
  { category: "Youth Training", budget: 60000, spent: 50000 },
  { category: "Mental Health", budget: 30000, spent: 20000 },
  { category: "Cultural Events", budget: 35000, spent: 30000 },
  { category: "Admin & Staff", budget: 25000, spent: 25000 },
];

const recentItemsData = [
  {
    no: "IN_001",
    category: "Cultural Events",
    itemName: "Cultural Workshop Supplies",
    qty: 12,
    unitPrice: 24.50,
    total: 294.00,
    date: "2025-06-20 10:32"
  },
  {
    no: "IN_002",
    category: "Admin Staff",
    itemName: "Program Coordinator Mileage",
    qty: 1,
    unitPrice: 96.80,
    total: 96.80,
    date: "2025-06-22 15:18"
  },
  {
    no: "IN_003",
    category: "Mental Health",
    itemName: "Group Counseling Session",
    qty: 1,
    unitPrice: 450.00,
    total: 450.00,
    date: "2025-06-25 11:05"
  },
  {
    no: "IN_004",
    category: "Cultural Events",
    itemName: "Bus Passes (Monthly Youth)",
    qty: 15,
    unitPrice: 90.00,
    total: 1350.00,
    date: "2025-07-02 09:14"
  },
  {
    no: "IN_005",
    category: "Mental Health",
    itemName: "Healthy Snacks for Drop-in",
    qty: 1,
    unitPrice: 175.00,
    total: 175.00,
    date: "2025-07-08 13:47"
  },
  {
    no: "IN_006",
    category: "Youth Training",
    itemName: "Land-Based Camp Equipment (rental)",
    qty: 2,
    unitPrice: 320.00,
    total: 640.00,
    date: "2025-07-19 16:22"
  },
  {
    no: "IN_007",
    category: "Youth Training",
    itemName: "Career Fair Booth Fee",
    qty: 1,
    unitPrice: 300.00,
    total: 300.00,
    date: "2025-08-01 10:06"
  },
  {
    no: "IN_008",
    category: "Youth Training",
    itemName: "Printing Outreach Flyers",
    qty: 500,
    unitPrice: 0.22,
    total: 110.00,
    date: "2025-08-03 12:41"
  },
];

// --- 3. Helper Components ---

// Bar Component for "Budget vs Spent"
const BudgetBar = ({ label, budget, spent }) => {
  const maxVal = Math.max(budget, spent) * 1.2; // 20% buffer for visual scaling
  const spentWidth = (spent / maxVal) * 100;
  const budgetWidth = (budget / maxVal) * 100;

  return (
    <div className="flex items-center gap-4 text-sm w-full">
      <span className="w-24 md:w-32 font-medium text-gray-600 truncate shrink-0">{label}</span>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
         {/* Spent Bar (Dark) */}
         <div className="flex items-center gap-2">
            <div className="h-6 bg-gray-600 rounded-sm flex items-center px-2 text-xs text-white font-medium whitespace-nowrap overflow-hidden" style={{ width: `${spentWidth}%` }}>
               ${spent.toLocaleString()}
            </div>
         </div>
         {/* Budget Bar (Light) */}
         <div className="flex items-center gap-2">
            <div className="h-6 bg-gray-200 rounded-sm flex items-center px-2 text-xs text-gray-600 font-medium whitespace-nowrap overflow-hidden" style={{ width: `${budgetWidth}%` }}>
               ${budget.toLocaleString()}
            </div>
         </div>
      </div>
    </div>
  );
};

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans space-y-6">
      
      {/* 1. Header & Global Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search" 
            className="pl-10 h-10 bg-white border-gray-200" 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1 md:flex-none">
            Budget Category <Plus size={16} className="ml-2" />
          </Button>
          <Button variant="outline" className="bg-white text-gray-600 border-gray-200 flex-1 md:flex-none">
            Download Data <Download size={16} className="ml-2" />
          </Button>
          <Button variant="outline" className="bg-white text-gray-600 border-gray-200 flex-1 md:flex-none">
            Upload Data <Upload size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* 2. Top Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left: Category Breakdown (Donut) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-80">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Budget Category Breakdown</h3>
          
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Chart */}
            <div className="relative w-48 h-48 shrink-0">
               <DonutChart 
                 data={budgetBreakdownData} 
                 category="name" 
                 value="amount" 
                 valueFormatter={(number) => `${number}%`}
               />
            </div>

            {/* Legend */}
            <div className="space-y-3 w-full max-w-xs">
              {budgetBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600 font-medium">{item.name}</span>
                   </div>
                   <span className="font-bold text-gray-900">{item.amount}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Budget Vs Spent (Bar List) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-80">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Budget Vs Spent (CAD)</h3>
          
          <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
             {budgetVsSpentData.map((item) => (
                <BudgetBar 
                  key={item.category}
                  label={item.category}
                  budget={item.budget}
                  spent={item.spent}
                />
             ))}
          </div>
        </div>

      </div>

      {/* 3. Recent Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Header / Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 w-full lg:w-auto">Recent Items Entered</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
            
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hidden sm:inline-flex">
                  <Filter size={18} />
               </Button>
               <Button variant="outline" className="h-9 text-xs text-gray-600 bg-white flex-1 sm:flex-none">
                 Filter By
               </Button>
               <Button variant="outline" className="h-9 text-xs text-gray-600 bg-white gap-1 flex-1 sm:flex-none">
                 Date <ChevronDown size={14} />
               </Button>
               <Button variant="outline" className="h-9 text-xs text-gray-600 bg-white gap-1 flex-1 sm:flex-none">
                 Category <ChevronDown size={14} />
               </Button>
               <Button variant="ghost" className="h-9 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 gap-1 flex-1 sm:flex-none justify-center">
                 <RotateCcw size={12} /> <span className="sm:inline hidden">Reset Filter</span><span className="sm:hidden">Reset</span>
               </Button>
            </div>

            <Button className="h-9 bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200 gap-2 shadow-sm font-medium w-full sm:w-auto">
              Add Receipt
              <Plus size={16} />
            </Button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                <TableHead className="font-bold text-gray-900 pl-6 h-10 text-xs uppercase tracking-wider">No.</TableHead>
                <TableHead className="font-bold text-gray-900 h-10 text-xs uppercase tracking-wider">Category</TableHead>
                <TableHead className="font-bold text-gray-900 h-10 text-xs uppercase tracking-wider min-w-[200px]">Item Name</TableHead>
                <TableHead className="font-bold text-gray-900 h-10 text-xs uppercase tracking-wider">Qty</TableHead>
                <TableHead className="font-bold text-gray-900 h-10 text-xs uppercase tracking-wider">Unit Price ($)</TableHead>
                <TableHead className="font-bold text-gray-900 h-10 text-xs uppercase tracking-wider">Total ($)</TableHead>
                <TableHead className="font-bold text-gray-900 h-10 text-xs uppercase tracking-wider pr-6 text-right">Date/Time Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentItemsData.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50 border-gray-100 transition-colors">
                  <TableCell className="font-medium text-gray-500 pl-6 py-4 text-sm">{item.no}</TableCell>
                  <TableCell className="text-gray-900 py-4 text-sm font-medium">{item.category}</TableCell>
                  <TableCell className="text-gray-600 py-4 text-sm">{item.itemName}</TableCell>
                  <TableCell className="text-gray-600 py-4 text-sm">{item.qty}</TableCell>
                  <TableCell className="text-gray-600 py-4 text-sm">${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-900 py-4 text-sm font-bold">${item.total.toFixed(2)}</TableCell>
                  <TableCell className="pr-6 py-4 text-right text-gray-500 text-sm font-mono whitespace-nowrap">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-center">
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <button className="px-2 py-1 hover:text-gray-900 disabled:opacity-50">&lt; Previous</button>
                <button className="w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded">1</button>
                <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">2</button>
                <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">3</button>
                <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded">4</button>
                <button className="px-2 py-1 hover:text-gray-900">Next &gt;</button>
            </div>
        </div>

      </div>
    </div>
  );
}