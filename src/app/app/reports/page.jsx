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
  Calendar, 
  Download, 
  Upload, 
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// --- 1. Helper Components ---

// Simple SVG Sparkline for the "Trend" visuals
const Sparkline = ({ type, color = "stroke-gray-400" }) => {
  // Different paths for different trend looks
  const paths = {
    up: "M2 20 L8 15 L14 18 L20 8 L26 12 L32 4",
    down: "M2 4 L8 10 L14 7 L20 18 L26 14 L32 22",
    fluctuate: "M2 15 L8 8 L14 18 L20 10 L26 16 L32 10",
    flat: "M2 12 L10 12 L18 12 L26 12 L34 12"
  };

  return (
    <svg width="40" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d={paths[type] || paths.fluctuate} 
        className={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

// Card Component with Mini Chart
const ReportCard = ({ title, value, status, statusColor, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-36">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    
    <div className="flex items-end justify-between mt-2">
      <div className="space-y-3">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        <div className="flex items-center gap-2">
           <span className="text-xs text-gray-400 font-medium">Status</span>
           <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${statusColor}`}>
             {status}
           </span>
        </div>
      </div>
      
      {/* Visual Chart Area */}
      <div className="bg-gray-50 p-2 rounded-lg mb-1">
         <Sparkline type={trend} color="stroke-gray-800" />
      </div>
    </div>
  </div>
);

// Status Badge for Table
const TableStatusBadge = ({ status }) => {
  const styles = {
    "On Track": "bg-gray-100 text-gray-600 border-gray-200",
    "Good": "bg-gray-100 text-gray-600 border-gray-200", // Image uses neutral gray/white style for 'Good' too
    "Low": "bg-red-50 text-red-600 border-red-100",
    "Weak": "bg-orange-50 text-orange-600 border-orange-100",
    "Fluctuating": "bg-yellow-50 text-yellow-700 border-yellow-100",
    "Steady": "bg-blue-50 text-blue-700 border-blue-100",
    "Strong": "bg-green-50 text-green-700 border-green-100",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-[11px] font-bold border ${styles[status] || "bg-gray-50 text-gray-500"}`}>
      {status}
    </span>
  );
};

// --- 2. Data ---

const reportStats = [
  {
    title: "% Intake Completed",
    value: "88%",
    status: "On Track",
    statusColor: "bg-gray-100 text-gray-600",
    trend: "up"
  },
  {
    title: "Avg. Mental Health Improvement",
    value: "3.9%",
    status: "Low",
    statusColor: "bg-red-50 text-red-600",
    trend: "fluctuate"
  },
  {
    title: "% in Employment/Education",
    value: "77%",
    status: "Good",
    statusColor: "bg-gray-100 text-gray-600",
    trend: "up"
  },
  {
    title: "% Attending Cultural Programs",
    value: "45%",
    status: "Weak",
    statusColor: "bg-orange-50 text-orange-600",
    trend: "down"
  }
];

const kpiTableData = [
  {
    kpi: "Intake Completion (%)",
    may: "78%",
    june: "82%",
    july: "85%",
    change: "+7 pts",
    status: "On Track",
    trend: "up"
  },
  {
    kpi: "Mental Health Improvement",
    may: "3.4",
    june: "3.6",
    july: "3.9",
    change: "+0.5",
    status: "Good",
    trend: "up"
  },
  {
    kpi: "Cultural Participation (%)",
    may: "39%",
    june: "43%",
    july: "41%",
    change: "+2 pts",
    status: "Fluctuating",
    trend: "fluctuate"
  },
  {
    kpi: "Program Retention (%)",
    may: "72%",
    june: "74%",
    july: "77%",
    change: "+5 pts",
    status: "Steady",
    trend: "up"
  },
  {
    kpi: "Youth Employment Rate (%)",
    may: "52%",
    june: "54%",
    july: "61%",
    change: "+9 pts",
    status: "Strong",
    trend: "up"
  },
];

// --- 3. Main Page Component ---

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans space-y-8">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search reports..." 
            className="pl-10 h-10 bg-white border-gray-200" 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
           <Button variant="outline" className="h-10 bg-white text-gray-600 gap-2">
             <Filter size={16} /> Filter By
           </Button>
           <Button variant="outline" className="h-10 bg-white text-gray-600 gap-2">
             <Calendar size={16} /> Date <ChevronDown size={14} />
           </Button>
           <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>
           <Button variant="outline" className="h-10 bg-white text-gray-700 gap-2 hover:bg-gray-50">
             Download Data <Download size={16} />
           </Button>
           <Button variant="outline" className="h-10 bg-white text-gray-700 gap-2 hover:bg-gray-50">
             Upload Data <Upload size={16} />
           </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, i) => (
          <ReportCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Enrollment & Intake KPIs</h3>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                <TableHead className="font-bold text-gray-900 w-[300px]">KPI</TableHead>
                <TableHead className="font-bold text-gray-900">May</TableHead>
                <TableHead className="font-bold text-gray-900">June</TableHead>
                <TableHead className="font-bold text-gray-900">July</TableHead>
                <TableHead className="font-bold text-gray-900">Change (July vs May)</TableHead>
                <TableHead className="font-bold text-gray-900 text-center">Status</TableHead>
                <TableHead className="font-bold text-gray-900 text-right pr-6">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiTableData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50 border-gray-100">
                  <TableCell className="font-medium text-gray-700 py-4">
                    {row.kpi}
                  </TableCell>
                  <TableCell className="text-gray-500">{row.may}</TableCell>
                  <TableCell className="text-gray-500">{row.june}</TableCell>
                  <TableCell className="text-gray-500">{row.july}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold text-gray-900">
                       <ArrowUpRight size={16} /> {row.change}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <TableStatusBadge status={row.status} />
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <div className="flex justify-end">
                      <Sparkline type={row.trend} color="stroke-gray-900" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
}