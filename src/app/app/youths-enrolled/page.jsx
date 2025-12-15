"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { UpdateYouths } from "@/app/components/ui/UpdateYouth";
import { toast } from "sonner"; 

// ... (Keep your statsData and StatusBadge components exactly as they were) ...
const statsData = [
  { label: "Total Youth Enrolled", value: "403", change: "+6.08%", trend: "up", trendColor: "text-green-600", bgColor: "bg-green-50" },
  { label: "Active Users", value: "312", change: "+6.08%", trend: "up", trendColor: "text-green-600", bgColor: "bg-green-50" },
  { label: "Completed", value: "71", change: "+6.08%", trend: "down", trendColor: "text-red-500", bgColor: "bg-red-50" },
  { label: "Dropped Out", value: "20", change: "+6.08%", trend: "down", trendColor: "text-red-500", bgColor: "bg-red-50" },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Dropout: "bg-gray-100 text-gray-500 border-gray-200",
    Completed: "bg-blue-50 text-blue-600 border-blue-100",
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-100", // Added Pending
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

export default function YouthsEnrolledPage() {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedYouth, setSelectedYouth] = useState(null);
  const [youths, setYouths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = [
          { id: "25-0001", name: "Alex Johnson", age: "18-25", gender: "Male", date: "2025-05-12", status: "Active", programs: "5 Programs" },
          { id: "25-0002", name: "Mia White", age: "12-17", gender: "Two-Spirit", date: "2025-06-03", status: "Active", programs: "7 Programs" },
          { id: "25-0003", name: "Jordan Patel", age: "18-25", gender: "Non-Binary", date: "2025-07-18", status: "Dropout", programs: "9 Programs" },
          { id: "25-0004", name: "Sophia Kim", age: "18-25", gender: "Female", date: "2025-05-27", status: "Completed", programs: "22 Programs" },
      ];
      setYouths(mockData);
    } catch (error) {
      console.error("Failed to fetch youths:", error);
      toast.error("Failed to load records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- NEW FUNCTION: Handle Saving Data from Modal ---
  const saveYouthData = async (newYouthData) => {
    // 1. OPTIMISTIC UPDATE: Update UI immediately so user sees the result
    if (selectedYouth) {
        // We are editing an existing youth
        setYouths(prev => prev.map(y => y.id === newYouthData.id ? { ...y, ...newYouthData } : y));
        toast.success("Youth updated successfully");
    } else {
        // We are adding a new youth (Prepend to list)
        setYouths(prev => [newYouthData, ...prev]);
        toast.success("New youth enrolled successfully", {
            description: `${newYouthData.name} has been enrolled!`
        });
    }

    // 2. BACKEND PROVISION (For Senior Dev)
    // ---------------------------------------------------------
    // This is where the actual API call will go.
    // Example:
    /*
    try {
        const method = selectedYouth ? 'PUT' : 'POST';
        const url = selectedYouth ? `/api/youths/${newYouthData.id}` : '/api/youths';
        
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newYouthData)
        });
    } catch (error) {
        // Revert local state if API fails
        toast.error("Sync failed", { description: "Could not save to server." });
        fetchData(); // Reload original data
    }
    */
    // ---------------------------------------------------------
  };

  const filteredYouths = youths.filter(youth => 
    youth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    youth.id.includes(searchTerm)
  );

  const handleUpdateClick = (youth) => {
    setSelectedYouth(youth);
    setIsUpdateOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans space-y-6">
      <UpdateYouths
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        initialData={selectedYouth}
        onSave={saveYouthData} // Pass the new save handler
      />

      {/* Top Controls */}
      <div className="flex items-center">
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Last 14 days
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Stats Cards (Same as before) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <div className={`flex items-center text-xs font-medium ${stat.trendColor} ${stat.bgColor} px-2 py-1 rounded-full`}>
                {stat.trend === "up" ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900 w-full lg:w-auto">Youths Enrolled</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or ID..."
                className="pl-10 h-10 bg-gray-50 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="h-10 text-gray-600 gap-2 bg-white">
                <Filter size={16} /> Filter By
              </Button>
              <Button variant="outline" className="h-10 text-gray-600 gap-2 bg-white">
                <Calendar size={16} /> Date <ChevronDown size={14} />
              </Button>
              <Button
                className="h-10 bg-gray-900 text-white hover:bg-gray-800 gap-2"
                onClick={() => handleUpdateClick(null)}
              >
                Add New Youth <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="font-semibold text-gray-900 pl-6">Youth ID</TableHead>
                <TableHead className="font-semibold text-gray-900">Full Name</TableHead>
                <TableHead className="font-semibold text-gray-900">Age Range</TableHead>
                <TableHead className="font-semibold text-gray-900">Gender</TableHead>
                <TableHead className="font-semibold text-gray-900">Date Registered</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900">No. of Prog.</TableHead>
                <TableHead className="font-semibold text-gray-900 text-right pr-6">Update Events</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" /> Loading records...
                        </div>
                    </TableCell>
                </TableRow>
              ) : filteredYouths.length === 0 ? (
                <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                        No youths found matching "{searchTerm}"
                    </TableCell>
                </TableRow>
              ) : (
                filteredYouths.map((youth, i) => (
                  <TableRow key={i} className="hover:bg-gray-50 border-gray-100">
                    <TableCell className="font-medium text-gray-600 pl-6">{youth.id}</TableCell>
                    <TableCell className="font-medium text-gray-900">{youth.name}</TableCell>
                    <TableCell className="text-gray-500">{youth.age}</TableCell>
                    <TableCell className="text-gray-500">{youth.gender}</TableCell>
                    <TableCell className="text-gray-500">{youth.date}</TableCell>
                    <TableCell>
                      <StatusBadge status={youth.status} />
                    </TableCell>
                    <TableCell className="text-gray-500">{youth.programs}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Link
                        href={`/app/youths-enrolled/${youth.id}`}
                        className="text-gray-900 font-medium underline text-sm hover:text-gray-600 cursor-pointer"
                      >
                        Update
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-center">
            <div className="flex gap-1">
                <button className="px-3 py-1 text-sm text-gray-400">Previous</button>
                <button className="px-3 py-1 text-sm bg-gray-900 text-white rounded-md">1</button>
                <button className="px-3 py-1 text-sm text-gray-600">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
}