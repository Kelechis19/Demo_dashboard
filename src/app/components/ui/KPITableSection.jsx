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
import {
	ArrowUp,
	ArrowDown,
	Download,
	Upload,
	FileSpreadsheet,
	FileText,
	CloudUpload,
	X,
	CheckCircle2,
} from "lucide-react";
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
	// --- States ---
	const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
	const [isUploadOpen, setIsUploadOpen] = useState(false);
	const [isDownloadOpen, setIsDownloadOpen] = useState(false);

	const [noteContent, setNoteContent] = useState("");
	const [editingRowIndex, setEditingRowIndex] = useState(null);
	const [downloadFormat, setDownloadFormat] = useState("csv");

	// NEW: File upload states
	const [selectedFile, setSelectedFile] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef(null);

	// --- Handlers for Notes ---
	const handleOpenNoteDialog = (index) => {
		setEditingRowIndex(index);
		const currentNote = data[index].notes;
		setNoteContent(currentNote === "Add Note" ? "" : currentNote);
		setIsNoteDialogOpen(true);
	};

	const handleSubmitNote = () => {
		if (editingRowIndex !== null) {
			const newData = [...data];
			newData[editingRowIndex] = {
				...newData[editingRowIndex],
				notes: noteContent || "Add Note",
			};
			setData(newData);
			setIsNoteDialogOpen(false);
			setEditingRowIndex(null);
			setNoteContent("");
		}
	};

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

		// Here you would typically:
		// 1. Read the file using FileReader
		// 2. Parse CSV/Excel data
		// 3. Update your KPI data
		console.log("Uploading file:", selectedFile.name);

		// Example: Read file as text (for CSV)
		const reader = new FileReader();
		reader.onload = (e) => {
			const contents = e.target.result;
			console.log("File contents:", contents);
			// Parse and process the data here
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
		<div className='w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6'>
			{/* Header Section with Buttons */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
				<h3 className='text-xl font-bold text-gray-800'>{title}</h3>
				<div className='flex gap-3'>
					<Button
						variant='outline'
						size='sm'
						className='flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-gray-50'
						onClick={() => setIsDownloadOpen(true)}>
						<Download size={16} />
						Download Data
					</Button>
					<Button
						variant='outline'
						size='sm'
						className='flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 hover:bg-gray-50'
						onClick={() => setIsUploadOpen(true)}>
						<Upload size={16} />
						Upload Data
					</Button>
				</div>
			</div>

			{/* Table Section */}
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow className='hover:bg-transparent'>
							<TableHead className='w-[300px] text-gray-900 font-bold'>
								KPI
							</TableHead>
							<TableHead className='text-gray-900 font-bold'>May</TableHead>
							<TableHead className='text-gray-900 font-bold'>June</TableHead>
							<TableHead className='text-gray-900 font-bold'>July</TableHead>
							<TableHead className='text-gray-900 font-bold'>Trend</TableHead>
							<TableHead className='text-gray-900 font-bold'>Notes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((row, index) => (
							<TableRow
								key={index}
								className='border-gray-100 hover:bg-gray-50/50'>
								<TableCell className='font-medium text-gray-700 py-4'>
									{row.kpi}
								</TableCell>
								<TableCell className='text-gray-600'>{row.may}</TableCell>
								<TableCell className='text-gray-600'>{row.june}</TableCell>
								<TableCell className='text-gray-600'>{row.july}</TableCell>
								<TableCell>
									<div
										className={`flex items-center gap-1 font-medium ${
											row.trendDir === "up"
												? "text-green-600"
												: row.trendDir === "down"
												? "text-red-600"
												: "text-gray-500"
										}`}>
										{row.trendDir === "up" && <ArrowUp size={16} />}
										{row.trendDir === "down" && <ArrowDown size={16} />}
										{row.trend}
									</div>
								</TableCell>
								<TableCell className='text-gray-500 text-sm'>
									<span
										onClick={() => handleOpenNoteDialog(index)}
										className={`cursor-pointer hover:text-gray-700 ${
											row.notes === "Add Note"
												? "text-gray-400 italic underline"
												: ""
										}`}>
										{row.notes}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* --- DIALOGS --- */}

			{/* 1. Add Note Dialog */}
			<Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Add Note</DialogTitle>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<Textarea
							id='note'
							placeholder='Enter your note here...'
							value={noteContent}
							onChange={(e) => setNoteContent(e.target.value)}
							className='min-h-[150px] resize-none'
						/>
					</div>
					<DialogFooter>
						<Button type='submit' onClick={handleSubmitNote}>
							Submit
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 2. Download Data Dialog */}
			<Dialog open={isDownloadOpen} onOpenChange={setIsDownloadOpen}>
				<DialogContent className='sm:max-w-[400px]'>
					<DialogHeader>
						<DialogTitle>Export Data</DialogTitle>
						<p className='text-sm text-gray-500'>
							Choose the format you'd like to export this table to.
						</p>
					</DialogHeader>

					<div className='py-4'>
						{/* Custom Radio Group using Tailwind */}
						<div className='grid grid-cols-2 gap-4'>
							<label
								className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 transition-all ${
									downloadFormat === "csv"
										? "border-gray-900 bg-gray-50"
										: "border-gray-200 bg-white"
								}`}
								onClick={() => setDownloadFormat("csv")}>
								<FileSpreadsheet
									className={`mb-3 h-6 w-6 ${
										downloadFormat === "csv" ? "text-gray-900" : "text-gray-600"
									}`}
								/>
								<span
									className={`font-medium ${
										downloadFormat === "csv" ? "text-gray-900" : "text-gray-600"
									}`}>
									CSV
								</span>
							</label>

							<label
								className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-gray-50 transition-all ${
									downloadFormat === "pdf"
										? "border-gray-900 bg-gray-50"
										: "border-gray-200 bg-white"
								}`}
								onClick={() => setDownloadFormat("pdf")}>
								<FileText
									className={`mb-3 h-6 w-6 ${
										downloadFormat === "pdf" ? "text-gray-900" : "text-gray-600"
									}`}
								/>
								<span
									className={`font-medium ${
										downloadFormat === "pdf" ? "text-gray-900" : "text-gray-600"
									}`}>
									PDF
								</span>
							</label>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setIsDownloadOpen(false)}
							className='cursor-pointer'>
							Cancel
						</Button>
						<Button onClick={handleDownloadConfirm} className='cursor-pointer'>
							Download
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* 3. Upload Data Dialog - UPDATED */}
			<Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Upload Data</DialogTitle>
						<p className='text-sm text-gray-500'>
							Upload a .csv or .xlsx file to update the KPI metrics.
						</p>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						{/* Hidden file input */}
						<input
							ref={fileInputRef}
							type='file'
							accept='.csv,.xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
							onChange={handleFileChange}
							className='hidden'
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
								}`}>
								<div className='flex flex-col items-center justify-center pt-5 pb-6'>
									<CloudUpload className='w-8 h-8 mb-2 text-gray-400 group-hover:text-gray-600' />
									<p className='mb-2 text-sm text-gray-500'>
										<span className='font-semibold'>Click to upload</span> or
										drag and drop
									</p>
									<p className='text-xs text-gray-500'>
										CSV or Excel (MAX. 5MB)
									</p>
								</div>
							</div>
						) : (
							// Selected file display
							<div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
								<div className='flex items-center gap-3'>
									<CheckCircle2 className='w-5 h-5 text-green-600' />
									<div>
										<p className='text-sm font-medium text-gray-900'>
											{selectedFile.name}
										</p>
										<p className='text-xs text-gray-500'>
											{(selectedFile.size / 1024).toFixed(2)} KB
										</p>
									</div>
								</div>
								<button
									onClick={handleRemoveFile}
									className='p-1 hover:bg-gray-200 rounded-full transition-colors'>
									<X className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button variant='outline' onClick={() => setIsUploadOpen(false)}>
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
