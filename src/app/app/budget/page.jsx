"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  ChevronDown,
  RotateCcw,
  X,
  FileSpreadsheet,
  FileText,
  CloudUpload,
  CheckCircle2,
} from "lucide-react";
// Importing Recharts directly
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
// Importing Sonner
import { toast } from "sonner";

// --- 1. Local Chart Component ---

const DonutChart = ({ data, category, value, valueFormatter }) => {
  // Calculate total for center text
  const total = data.reduce((acc, curr) => acc + curr[value], 0);

  return (
    <div className="w-full h-full min-h-[200px] relative">
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* displaying total count or a specific metric */}
        <span className="text-xl font-bold text-gray-800">Total: {total}</span>
      </div>
    </div>
  );
};

// --- 2. Initial Data ---

const initialBudgetBreakdown = [
  { name: "Youth Training", amount: 83, color: "#4b5563" },
  { name: "Mental Health", amount: 67, color: "#9ca3af" },
  { name: "Cultural Events", amount: 86, color: "#d1d5db" },
  { name: "Admin & Staff", amount: 100, color: "#e5e7eb" },
];

const initialBudgetVsSpent = [
  { category: "Youth Training", budget: 60000, spent: 50000 },
  { category: "Mental Health", budget: 30000, spent: 20000 },
  { category: "Cultural Events", budget: 35000, spent: 30000 },
  { category: "Admin & Staff", budget: 25000, spent: 25000 },
];

const initialRecentItems = [
  { no: "IN_001", category: "Cultural Events", itemName: "Cultural Workshop Supplies", qty: 12, unitPrice: 24.50, total: 294.00, date: "2025-06-20 10:32" },
  { no: "IN_002", category: "Admin & Staff", itemName: "Program Coordinator Mileage", qty: 1, unitPrice: 96.80, total: 96.80, date: "2025-06-22 15:18" },
  { no: "IN_003", category: "Mental Health", itemName: "Group Counseling Session", qty: 1, unitPrice: 450.00, total: 450.00, date: "2025-06-25 11:05" },
  { no: "IN_004", category: "Cultural Events", itemName: "Bus Passes (Monthly Youth)", qty: 15, unitPrice: 90.00, total: 1350.00, date: "2025-07-02 09:14" },
  { no: "IN_005", category: "Mental Health", itemName: "Healthy Snacks for Drop-in", qty: 1, unitPrice: 175.00, total: 175.00, date: "2025-07-08 13:47" },
];

// --- 3. Helper Components ---

const BudgetBar = ({ label, budget, spent }) => {
  const maxVal = Math.max(budget, spent) * 1.2; 
  const spentWidth = (spent / maxVal) * 100;
  const budgetWidth = (budget / maxVal) * 100;

  return (
    <div className="flex items-center gap-4 text-sm w-full">
      <span className="w-24 md:w-32 font-medium text-gray-600 truncate shrink-0">{label}</span>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
         <div className="flex items-center gap-2">
            <div className="h-6 bg-gray-600 rounded-sm flex items-center px-2 text-xs text-white font-medium whitespace-nowrap overflow-hidden" style={{ width: `${spentWidth}%` }}>
               ${spent.toLocaleString()}
            </div>
         </div>
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
  // --- Data States ---
  const [budgetBreakdown, setBudgetBreakdown] = useState(initialBudgetBreakdown);
  const [budgetVsSpent, setBudgetVsSpent] = useState(initialBudgetVsSpent);
  const [recentItems, setRecentItems] = useState(initialRecentItems);

  // --- UI States ---
  const [isBudgetCategoryOpen, setIsBudgetCategoryOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("csv");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(recentItems.length / itemsPerPage);

  const paginatedItems = recentItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Forms State ---
  const [newCategory, setNewCategory] = useState({ name: "", budget: "", period: "", status: "Active" });
  const [newReceipt, setNewReceipt] = useState({ 
    itemName: "", 
    category: "", 
    qty: "", 
    unitPrice: "", 
    date: new Date().toISOString().slice(0, 16) 
  });

  // --- File Upload Logic ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // --- Handlers ---

  // 1. Budget Category Handlers
  const handleCategorySubmit = () => {
    if (!newCategory.name || !newCategory.budget) {
      toast.error("Please fill in the category name and budget.");
      return;
    }

    const budgetAmount = parseFloat(newCategory.budget);

    // Update Donut Data (Simulation)
    setBudgetBreakdown([
      ...budgetBreakdown,
      { name: newCategory.name, amount: 10, color: "#1f2937" } // Defaulting new items to dark for visibility
    ]);

    // Update Bar Chart Data
    setBudgetVsSpent([
      ...budgetVsSpent,
      { category: newCategory.name, budget: budgetAmount, spent: 0 }
    ]);

    toast.success(`Category "${newCategory.name}" added successfully!`);
    setIsBudgetCategoryOpen(false);
    setNewCategory({ name: "", budget: "", period: "", status: "Active" });
  };

  // 2. Receipt Handlers
  const handleReceiptSubmit = () => {
    if (!newReceipt.itemName || !newReceipt.category || !newReceipt.qty || !newReceipt.unitPrice) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const qty = parseFloat(newReceipt.qty);
    const price = parseFloat(newReceipt.unitPrice);
    const total = qty * price;

    const newItem = {
      no: `IN_00${recentItems.length + 1}`,
      category: newReceipt.category,
      itemName: newReceipt.itemName,
      qty: qty,
      unitPrice: price,
      total: total,
      date: newReceipt.date.replace("T", " ")
    };

    setRecentItems([newItem, ...recentItems]);
    
    // Update Spent amount in charts automatically
    const updatedBudgetVsSpent = budgetVsSpent.map(item => {
        if (item.category === newReceipt.category) {
            return { ...item, spent: item.spent + total };
        }
        return item;
    });
    setBudgetVsSpent(updatedBudgetVsSpent);

    toast.success("Receipt added and budget updated!");
    setIsReceiptOpen(false);
    // Reset form
    setNewReceipt({ 
        itemName: "", 
        category: "", 
        qty: "", 
        unitPrice: "", 
        date: new Date().toISOString().slice(0, 16) 
    });
  };

  // 3. File Handlers
  const handleFileClick = () => fileInputRef.current?.click();

  const validateFile = (file) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const validExtensions = [".csv", ".xls", ".xlsx"];
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));

    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload CSV or Excel.");
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size exceeds 5MB limit.");
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUploadConfirm = () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    // Simulation of upload
    toast.success(`Successfully uploaded ${selectedFile.name}`);
    setIsUploadOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDownloadConfirm = () => {
    toast.success(`Downloading data in ${downloadFormat.toUpperCase()} format...`);
    setIsDownloadOpen(false);
  };

  // 4. Pagination Handler
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans space-y-6">
      
      {/* 1. Header & Global Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start lg:justify-end md:items-center gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button 
            variant="secondary" 
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1 md:flex-none cursor-pointer"
            onClick={() => setIsBudgetCategoryOpen(true)}
          >
            Budget Category <Plus size={16} className="ml-2" />
          </Button>
          <Button 
            variant="outline" 
            className="bg-white text-gray-600 border-gray-200 flex-1 md:flex-none cursor-pointer"
            onClick={() => setIsDownloadOpen(true)}
          >
            Download Data <Download size={16} className="ml-2" />
          </Button>
          <Button 
            variant="outline" 
            className="bg-white text-gray-600 border-gray-200 flex-1 md:flex-none cursor-pointer"
            onClick={() => setIsUploadOpen(true)}
          >
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
            <div className="relative w-48 h-48 shrink-0">
               <DonutChart 
                 data={budgetBreakdown} 
                 category="name" 
                 value="amount" 
                 valueFormatter={(number) => `${number}`}
               />
            </div>
            <div className="space-y-3 w-full max-w-xs">
              {budgetBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600 font-medium">{item.name}</span>
                   </div>
                   <span className="font-bold text-gray-900">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Budget Vs Spent (Bar List) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-80">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Budget Vs Spent (CAD)</h3>
          <div className="flex-1 flex flex-col justify-center space-y-6 w-full">
             {budgetVsSpent.map((item) => (
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

            <Button 
              className="h-9 bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200 gap-2 shadow-sm font-medium w-full sm:w-auto cursor-pointer"
              onClick={() => setIsReceiptOpen(true)}
            >
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
              {paginatedItems.map((item, index) => (
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
              {paginatedItems.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">No items found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-center">
            <div className="flex items-center gap-1 text-xs text-gray-500">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &lt; Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button 
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                            currentPage === page 
                            ? "bg-gray-900 text-white" 
                            : "hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next &gt;
                </button>
            </div>
        </div>
      </div>

      {/* --- DIALOGS --- */}

      {/* 1. Budget Category Dialog */}
      <Dialog open={isBudgetCategoryOpen} onOpenChange={setIsBudgetCategoryOpen}>
        <DialogContent className="sm:max-w-[700px] p-6 bg-white rounded-xl">
          <DialogHeader className="mb-4 flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">Add New Budget Category</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6 pb-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Category Name</label>
              <Input 
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="e.g. Transportation" 
                className="bg-white border-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Total Allocated Budget ($)</label>
              <Input 
                type="number"
                value={newCategory.budget}
                onChange={(e) => setNewCategory({...newCategory, budget: e.target.value})}
                placeholder="5000" 
                className="bg-white border-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Budget Period (Months)</label>
              <Input 
                value={newCategory.period}
                onChange={(e) => setNewCategory({...newCategory, period: e.target.value})}
                placeholder="12" 
                className="bg-white border-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Status</label>
              <div className="relative">
                <select 
                    value={newCategory.status}
                    onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-gray-900"
                >
                   <option>Active</option>
                   <option>Closed</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              className="w-48 bg-[#1a1a1a] hover:bg-black text-white h-10 rounded-md cursor-pointer"
              onClick={handleCategorySubmit}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2. Add Receipt / Invoice Dialog */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-[700px] p-6 bg-white rounded-xl">
          <DialogHeader className="mb-4 flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">Add New Receipt</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6 pb-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Item Name</label>
              <Input 
                value={newReceipt.itemName}
                onChange={(e) => setNewReceipt({...newReceipt, itemName: e.target.value})}
                placeholder="Name of item" 
                className="bg-white border-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Category</label>
              <div className="relative">
                <select 
                    value={newReceipt.category}
                    onChange={(e) => setNewReceipt({...newReceipt, category: e.target.value})}
                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-gray-900"
                >
                   <option value="">Select Category</option>
                   {budgetVsSpent.map(cat => (
                       <option key={cat.category} value={cat.category}>{cat.category}</option>
                   ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Quantity</label>
              <Input 
                type="number"
                value={newReceipt.qty}
                onChange={(e) => setNewReceipt({...newReceipt, qty: e.target.value})}
                placeholder="1" 
                className="bg-white border-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Unit Price ($)</label>
              <Input 
                type="number"
                value={newReceipt.unitPrice}
                onChange={(e) => setNewReceipt({...newReceipt, unitPrice: e.target.value})}
                placeholder="0.00" 
                className="bg-white border-gray-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Total ($)</label>
              <div className="relative">
                 <Input 
                    value={
                        (parseFloat(newReceipt.qty || 0) * parseFloat(newReceipt.unitPrice || 0)).toFixed(2)
                    }
                    readOnly
                    className="bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed" 
                 />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">Time/Date Added</label>
              <Input 
                type="datetime-local"
                value={newReceipt.date}
                onChange={(e) => setNewReceipt({...newReceipt, date: e.target.value})}
                className="bg-white border-gray-200 text-gray-900" 
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              className="w-48 bg-[#1a1a1a] hover:bg-black text-white h-10 rounded-md cursor-pointer"
              onClick={handleReceiptSubmit}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 3. Download Data Dialog */}
      <Dialog open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <p className="text-sm text-gray-500">
              Choose the format you'd like to export this table to.
            </p>
          </DialogHeader>

          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 transition-all ${
                  downloadFormat === "csv"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => setDownloadFormat("csv")}
              >
                <FileSpreadsheet
                  className={`mb-3 h-6 w-6 ${
                    downloadFormat === "csv" ? "text-gray-900" : "text-gray-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    downloadFormat === "csv" ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  CSV
                </span>
              </label>

              <label
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 transition-all ${
                  downloadFormat === "pdf"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => setDownloadFormat("pdf")}
              >
                <FileText
                  className={`mb-3 h-6 w-6 ${
                    downloadFormat === "pdf" ? "text-gray-900" : "text-gray-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    downloadFormat === "pdf" ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  PDF
                </span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDownloadOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button onClick={handleDownloadConfirm} className="cursor-pointer">
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Upload Data Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Data</DialogTitle>
            <p className="text-sm text-gray-500">
              Upload a .csv or .xlsx file to update the budget metrics.
            </p>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File upload area */}
            {!selectedFile ? (
              <div
                onClick={handleFileClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors cursor-pointer group ${
                  isDragging
                    ? "border-gray-900 bg-gray-100"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUpload className="w-8 h-8 mb-2 text-gray-400 group-hover:text-gray-600" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    CSV or Excel (MAX. 5MB)
                  </p>
                </div>
              </div>
            ) : (
              // Selected file display
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadConfirm} disabled={!selectedFile}>
              Upload File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}