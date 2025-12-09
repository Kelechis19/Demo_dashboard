"use client";

import React, { useState } from "react";
// Use Link in your real app: import Link from "next/link";
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
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Filter, Plus, ChevronDown } from "lucide-react";

// --- 1. Initial Data ---
const initialAdminsData = [
	{
		id: "25-0001",
		name: "Sarah McKenzie",
		role: "Admin",
		status: "Active",
		lastLogin: "Aug 14, 2025 09:42",
	},
	{
		id: "25-0002",
		name: "Daniel Roberts",
		role: "Program Manager",
		status: "Active",
		lastLogin: "Aug 13, 2025 14:15",
	},
	{
		id: "25-0003",
		name: "Olivia Chen",
		role: "Data Entry Clerk",
		status: "Active",
		lastLogin: "Jul 28, 2025 11:02",
	},
	{
		id: "25-0004",
		name: "Aiden Thompson",
		role: "Viewer",
		status: "Suspended",
		lastLogin: "Aug 15, 2025 08:30",
	},
	{
		id: "25-0005",
		name: "Mia Patel",
		role: "Program Manager",
		status: "Active",
		lastLogin: "Aug 15, 2025 08:30",
	},
];

// --- 2. Helper Components ---

const StatusBadge = ({ status }) => {
	const styles = {
		Active: "bg-green-50 text-green-700 border-green-200",
		Suspended: "bg-red-50 text-red-600 border-red-100",
	};

	return (
		<span
			className={`px-3 py-1 rounded-sm text-xs font-bold border ${
				styles[status] || "bg-gray-100 text-gray-600"
			}`}>
			{status}
		</span>
	);
};

// --- 3. Main Component ---

export default function AdminPage() {
	const [admins, setAdmins] = useState(initialAdminsData);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Form State
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "Program Manager",
		phone: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddAdmin = () => {
		// Logic to add the new admin to the list
		const newAdmin = {
			id: `25-000${admins.length + 1}`,
			name: formData.name,
			role: formData.role,
			status: "Active", // Default status
			lastLogin: "Never",
		};

		setAdmins([...admins, newAdmin]);
		setIsDialogOpen(false); // Close modal
		setFormData({
			name: "",
			email: "",
			role: "Program Manager",
			phone: "",
			password: "",
		}); // Reset form
	};

	return (
		<div className=' bg-gray-50 p-6 font-sans space-y-6'>
			{/* 1. Page Header & Actions */}
			<div className='flex flex-col md:flex-row justify-between items-start lg:justify-end md:items-center gap-4'>
				{/* Action Buttons */}
				<div className='flex flex-wrap gap-2 w-full md:w-auto items-center'>
					{/* ADD ADMIN DIALOG */}
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button className='h-9 bg-gray-900 text-white hover:bg-black border border-gray-900 gap-2 shadow-sm font-medium ml-2 cursor-pointer'>
								Add Admin
								<Plus size={16} />
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[800px] bg-white p-0 gap-0 rounded-xl'>
							{/* Header */}
							<DialogHeader className='p-6 pb-4 border-b border-gray-100'>
								<DialogTitle className='text-xl font-bold text-gray-900'>
									Add Admin
								</DialogTitle>
							</DialogHeader>

							{/* Form Fields - 2 Column Grid */}
							<div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
								{/* Admin ID (Auto-generated) */}
								<div className='space-y-2'>
									<Label className='text-sm font-semibold text-gray-700'>
										Admin ID (auto-generated)
									</Label>
									<Input
										value={`25-000${admins.length + 1}`}
										disabled
										className='h-11 bg-gray-50 border-gray-200 text-gray-500 font-medium'
									/>
								</div>

								{/* Full Name */}
								<div className='space-y-2'>
									<Label
										htmlFor='name'
										className='text-sm font-semibold text-gray-700'>
										Full Name
									</Label>
									<Input
										id='name'
										name='name'
										placeholder='Enter full name'
										className='h-11 border-gray-200 focus:border-gray-900 focus:ring-gray-900'
										value={formData.name}
										onChange={handleInputChange}
									/>
								</div>

								{/* Email Address */}
								<div className='space-y-2'>
									<Label
										htmlFor='email'
										className='text-sm font-semibold text-gray-700'>
										Email Address
									</Label>
									<Input
										id='email'
										name='email'
										type='email'
										placeholder='name@youthmetrics.com'
										className='h-11 border-gray-200 focus:border-gray-900 focus:ring-gray-900'
										value={formData.email}
										onChange={handleInputChange}
									/>
								</div>

								{/* Role */}
								<div className='space-y-2'>
									<Label
										htmlFor='role'
										className='text-sm font-semibold text-gray-700'>
										Role
									</Label>
									<div className='relative'>
										<select
											id='role'
											name='role'
											className='w-full h-11 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm focus:border-gray-900 focus:ring-gray-900 appearance-none'
											value={formData.role}
											onChange={handleInputChange}>
											<option value='Select Admin Role' disabled>
												Select Admin Role
											</option>
											<option value='Admin'>Admin</option>
											<option value='Program Manager'>Program Manager</option>
											<option value='Data Entry'>Data Entry</option>
											<option value='Viewer'>Viewer</option>
										</select>
										<ChevronDown
											className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
											size={16}
										/>
									</div>
								</div>

								{/* Phone (Optional) */}
								<div className='space-y-2'>
									<Label
										htmlFor='phone'
										className='text-sm font-semibold text-gray-700'>
										Phone (optional)
									</Label>
									<Input
										id='phone'
										name='phone'
										placeholder='Enter phone number'
										className='h-11 border-gray-200 focus:border-gray-900 focus:ring-gray-900'
										value={formData.phone}
										onChange={handleInputChange}
									/>
								</div>

								{/* Password */}
								<div className='space-y-2'>
									<Label
										htmlFor='password'
										className='text-sm font-semibold text-gray-700'>
										Password (set or auto-generate)
									</Label>
									<Input
										id='password'
										name='password'
										type='password'
										placeholder='Enter password'
										className='h-11 border-gray-200 focus:border-gray-900 focus:ring-gray-900'
										value={formData.password}
										onChange={handleInputChange}
									/>
								</div>
							</div>

							{/* Footer */}
							<DialogFooter className='p-6 pt-2 border-t border-gray-50'>
								<div className='flex w-full gap-4'>
									<Button
										variant='outline'
										className='flex-1 h-11 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
										onClick={() => setIsDialogOpen(false)}>
										Cancel
									</Button>
									<Button
										className='flex-1 h-11 bg-gray-900 text-white hover:bg-black'
										onClick={handleAddAdmin}>
										Create Account
									</Button>
								</div>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* 2. Admin Management Table */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
				{/* Card Header */}
				<div className='p-6 border-b border-gray-100'>
					<h2 className='text-lg font-bold text-gray-900'>Admin Management</h2>
				</div>

				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow className='bg-gray-50/50 hover:bg-gray-50/50 border-gray-100'>
								<TableHead className='font-bold text-gray-900 pl-6 h-12'>
									Admin ID
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Name
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Role
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Status
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Last Login
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12 pr-6 text-right'>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{admins.map((admin) => (
								<TableRow
									key={admin.id}
									className='hover:bg-gray-50/50 border-gray-100 transition-colors'>
									<TableCell className='font-medium text-gray-500 pl-6 py-4'>
										{admin.id}
									</TableCell>
									<TableCell className='text-gray-900 py-4 font-medium'>
										{admin.name}
									</TableCell>
									<TableCell className='text-gray-600 py-4'>
										{admin.role}
									</TableCell>
									<TableCell className='py-4'>
										<StatusBadge status={admin.status} />
									</TableCell>
									<TableCell className='text-gray-500 py-4 text-sm'>
										{admin.lastLogin}
									</TableCell>
									<TableCell className='pr-6 py-4 text-right'>
										{/* Update Link - Navigates to the dynamic [id] page */}
										<a
											href={`/app/admin/${admin.id}`}
											className='text-gray-900 font-medium underline text-sm hover:text-gray-600'>
											Update
										</a>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				<div className='p-4 border-t border-gray-100 flex items-center justify-center'>
					<div className='flex items-center gap-1 text-xs text-gray-500'>
						<button className='px-2 py-1 hover:text-gray-900 disabled:opacity-50'>
							&lt; Previous
						</button>
						<button className='w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded'>
							1
						</button>
						<button className='w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded'>
							2
						</button>
						<button className='w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded'>
							3
						</button>
						<button className='w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded'>
							4
						</button>
						<button className='px-2 py-1 hover:text-gray-900'>Next &gt;</button>
					</div>
				</div>
			</div>
		</div>
	);
}
