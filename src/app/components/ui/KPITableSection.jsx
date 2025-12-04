// src/components/ui/KPITableSection.jsx
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function KPITableSection({ title, data, setData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const handleOpenDialog = (index) => {
    setEditingRowIndex(index);
    // Pre-fill the note if it's not the default "Add Note"
    const currentNote = data[index].notes;
    setNoteContent(currentNote === "Add Note" ? "" : currentNote);
    setIsDialogOpen(true);
  };

  const handleSubmitNote = () => {
    if (editingRowIndex !== null) {
      const newData = [...data];
      newData[editingRowIndex] = {
        ...newData[editingRowIndex],
        notes: noteContent || "Add Note", // Revert to "Add Note" if empty
      };
      setData(newData);
      setIsDialogOpen(false);
      setEditingRowIndex(null);
      setNoteContent("");
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      {/* Header Section with Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-gray-600">
            <Download size={16} />
            Download Data
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-gray-600">
            <Upload size={16} />
            Upload Data
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] text-gray-900 font-bold">KPI</TableHead>
              <TableHead className="text-gray-900 font-bold">May</TableHead>
              <TableHead className="text-gray-900 font-bold">June</TableHead>
              <TableHead className="text-gray-900 font-bold">July</TableHead>
              <TableHead className="text-gray-900 font-bold">Trend</TableHead>
              <TableHead className="text-gray-900 font-bold">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="border-gray-100 hover:bg-gray-50/50">
                <TableCell className="font-medium text-gray-700 py-4">
                  {row.kpi}
                </TableCell>
                <TableCell className="text-gray-600">{row.may}</TableCell>
                <TableCell className="text-gray-600">{row.june}</TableCell>
                <TableCell className="text-gray-600">{row.july}</TableCell>
                <TableCell>
                  {/* Logic to handle styling based on trend direction */}
                  <div className={`flex items-center gap-1 font-medium ${
                    row.trendDir === "up" ? "text-green-600" : 
                    row.trendDir === "down" ? "text-red-600" : "text-gray-500"
                  }`}>
                    {row.trendDir === "up" && <ArrowUp size={16} />}
                    {row.trendDir === "down" && <ArrowDown size={16} />}
                    {row.trend}
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  <span 
                    onClick={() => handleOpenDialog(index)}
                    className={`cursor-pointer hover:text-gray-700 ${row.notes === "Add Note" ? "text-gray-400 italic underline" : ""}`}
                  >
                    {row.notes}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              id="note"
              placeholder="Enter your note here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmitNote}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}