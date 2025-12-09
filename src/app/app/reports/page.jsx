"use client";

import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Download,
  Upload,
  ArrowUpRight,
  FileSpreadsheet,
  FileText,
  CloudUpload,
  X,
  CheckCircle2,
} from "lucide-react";

// --- 1. Helper Components ---

// Simple SVG Sparkline for the "Trend" visuals
const Sparkline = ({ type, color = "stroke-gray-400" }) => {
  const paths = {
    up: "M2 20 L8 15 L14 18 L20 8 L26 12 L32 4",
    down: "M2 4 L8 10 L14 7 L20 18 L26 14 L32 22",
    fluctuate: "M2 15 L8 8 L14 18 L20 10 L26 16 L32 10",
    flat: "M2 12 L10 12 L18 12 L26 12 L34 12",
  };

  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
          <span
            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${statusColor}`}
          >
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
    Good: "bg-gray-100 text-gray-600 border-gray-200",
    Low: "bg-red-50 text-red-600 border-red-100",
    Weak: "bg-orange-50 text-orange-600 border-orange-100",
    Fluctuating: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Steady: "bg-blue-50 text-blue-700 border-blue-100",
    Strong: "bg-green-50 text-green-700 border-green-100",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-[11px] font-bold border ${
        styles[status] || "bg-gray-50 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
};

// --- 2. Initial Data ---

const reportStats = [
  {
    title: "% Intake Completed",
    value: "88%",
    status: "On Track",
    statusColor: "bg-gray-100 text-gray-600",
    trend: "up",
  },
  {
    title: "Avg. Mental Health Improvement",
    value: "3.9%",
    status: "Low",
    statusColor: "bg-red-50 text-red-600",
    trend: "fluctuate",
  },
  {
    title: "% in Employment/Education",
    value: "77%",
    status: "Good",
    statusColor: "bg-gray-100 text-gray-600",
    trend: "up",
  },
  {
    title: "% Attending Cultural Programs",
    value: "45%",
    status: "Weak",
    statusColor: "bg-orange-50 text-orange-600",
    trend: "down",
  },
];

const initialKpiTableData = [
  {
    kpi: "Intake Completion (%)",
    may: "78%",
    june: "82%",
    july: "85%",
    change: "+7 pts",
    status: "On Track",
    trend: "up",
  },
  {
    kpi: "Mental Health Improvement",
    may: "3.4",
    june: "3.6",
    july: "3.9",
    change: "+0.5",
    status: "Good",
    trend: "up",
  },
  {
    kpi: "Cultural Participation (%)",
    may: "39%",
    june: "43%",
    july: "41%",
    change: "+2 pts",
    status: "Fluctuating",
    trend: "fluctuate",
  },
  {
    kpi: "Program Retention (%)",
    may: "72%",
    june: "74%",
    july: "77%",
    change: "+5 pts",
    status: "Steady",
    trend: "up",
  },
  {
    kpi: "Youth Employment Rate (%)",
    may: "52%",
    june: "54%",
    july: "61%",
    change: "+9 pts",
    status: "Strong",
    trend: "up",
  },
];

// --- 3. Main Page Component ---

export default function ReportsPage() {
  // --- States ---
  const [data, setData] = useState(initialKpiTableData);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("csv");

  // NEW: File upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // --- NEW: File Upload Handlers ---
  const handleFileClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const validateFile = (file) => {
    // Check file type
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const validExtensions = [".csv", ".xls", ".xlsx"];
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));

    if (
      !validTypes.includes(file.type) &&
      !validExtensions.includes(fileExtension)
    ) {
      alert("Please upload a CSV or Excel file (.csv, .xls, .xlsx)");
      return false;
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
      console.log("File size:", (file.size / 1024).toFixed(2), "KB");
      console.log("File type:", file.type);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      console.log("Dropped file:", file.name);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadConfirm = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    console.log("Uploading file:", selectedFile.name);

    // Example: Read file as text (for CSV)
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      console.log("File contents:", contents);
      // Logic to parse and update `data` would go here
    };
    reader.readAsText(selectedFile);

    // Close dialog and reset
    setIsUploadOpen(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Handlers for Data Operations ---
  const handleDownloadConfirm = () => {
    // Logic to download data based on downloadFormat state
    console.log(`Downloading data in ${downloadFormat} format...`);
    setIsDownloadOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans space-y-8">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between lg:justify-end gap-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="outline"
            onClick={() => setIsDownloadOpen(true)}
            className="h-10 bg-white text-gray-700 gap-2 hover:bg-gray-50 cursor-pointer"
          >
            Download Data <Download size={16} />
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsUploadOpen(true)}
            className="h-10 bg-white text-gray-700 gap-2 hover:bg-gray-50 cursor-pointer"
          >
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
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Enrollment & Intake KPIs
        </h3>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-gray-100">
                <TableHead className="font-bold text-gray-900 w-[300px]">
                  KPI
                </TableHead>
                <TableHead className="font-bold text-gray-900">May</TableHead>
                <TableHead className="font-bold text-gray-900">June</TableHead>
                <TableHead className="font-bold text-gray-900">July</TableHead>
                <TableHead className="font-bold text-gray-900">
                  Change (July vs May)
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-center">
                  Status
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-right pr-6">
                  Trend
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50/50 border-gray-100"
                >
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

      {/* --- DIALOGS (Integrated from Source) --- */}

      {/* 1. Download Data Dialog */}
      <Dialog open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <p className="text-sm text-gray-500">
              Choose the format you'd like to export this table to.
            </p>
          </DialogHeader>

          <div className="py-4">
            {/* Custom Radio Group using Tailwind */}
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

      {/* 2. Upload Data Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Data</DialogTitle>
            <p className="text-sm text-gray-500">
              Upload a .csv or .xlsx file to update the KPI metrics.
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