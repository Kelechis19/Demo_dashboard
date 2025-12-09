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
	Plus,
	TrendingUp,
	TrendingDown,
	ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { AddEvent } from "@/app/components/ui/AddEvent";

// --- 1. Data & Config ---
const statsData = [
	{
		label: "Total Events Held",
		value: "403",
		change: "+6.08%",
		trend: "up",
		trendColor: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		label: "Ongoing Events",
		value: "312",
		change: "+6.08%",
		trend: "up",
		trendColor: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		label: "Completed",
		value: "71",
		change: "+6.08%",
		trend: "down",
		trendColor: "text-red-500",
		bgColor: "bg-red-50",
	},
	{
		label: "Dropped Out",
		value: "20",
		change: "+6.08%",
		trend: "down",
		trendColor: "text-red-500",
		bgColor: "bg-red-50",
	},
];

const eventsData = [
	{
		id: 1,
		name: "Career Readiness Workshop",
		category: "Employment",
		description:
			"A workshop to train youth on resume writing and interview prep",
		date: "Jan 15, 2025",
		time: "10:00 AM – 2:00 PM",
		location: "Toronto, ON (YMCA Centre)",
		facilitators: "Sarah Johnson",
		status: "Completed",
	},
	{
		id: 2,
		name: "Digital Skills Bootcamp",
		category: "Training",
		description: "5-day bootcamp on coding & digital literacy",
		date: "Feb 10–14, 2025",
		time: "9:00 AM – 4:00 PM",
		location: "Vancouver, BC (Community Hub)",
		facilitators: "David Chen, Priya Patel",
		status: "Ongoing",
	},
	{
		id: 3,
		name: "Mental Health Awareness",
		category: "Health",
		description: "Interactive session on stress management",
		date: "Mar 05, 2025",
		time: "1:00 PM – 3:00 PM",
		location: "Online (Zoom)",
		facilitators: "Dr. Emily Wong",
		status: "Upcoming",
	},
	{
		id: 4,
		name: "Youth Leadership Summit",
		category: "Leadership",
		description: "Annual summit for youth leaders",
		date: "Apr 20, 2025",
		time: "9:00 AM – 5:00 PM",
		location: "Montreal, QC (Convention Ctr)",
		facilitators: "Michael Brown",
		status: "Upcoming",
	},
	{
		id: 5,
		name: "Financial Literacy 101",
		category: "Education",
		description: "Basics of budgeting and saving",
		date: "May 12, 2025",
		time: "4:00 PM – 6:00 PM",
		location: "Calgary, AB (Public Library)",
		facilitators: "Jessica Lee",
		status: "Completed",
	},
];

// --- 2. Helper Components ---

// Status Badge Component
const StatusBadge = ({ status }) => {
	const styles = {
		Completed: "bg-green-50 text-green-700 border-green-200",
		Ongoing: "bg-blue-50 text-blue-700 border-blue-200",
		Upcoming: "bg-orange-50 text-orange-700 border-orange-200",
	};

	return (
		<span
			className={`px-3 py-1 rounded-full text-xs font-medium border ${
				styles[status] || "bg-gray-100 text-gray-800"
			}`}>
			{status}
		</span>
	);
};

// --- 3. Main Page Component ---
export default function EventsPage() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
	return (
		<div className='min-h-screen bg-gray-50 p-6 font-sans space-y-6'>
			{/* Top Controls (Date Filter) */}
			<div className='flex items-center'>
				<button className='flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
					Last 14 days
					<ChevronDown size={16} />
				</button>
			</div>

			{/* Stats Cards Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{statsData.map((stat, index) => (
					<div
						key={index}
						className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow'>
						<h3 className='text-sm font-medium text-gray-500 mb-2'>
							{stat.label}
						</h3>
						<div className='flex items-end justify-between'>
							<span className='text-3xl font-bold text-gray-900'>
								{stat.value}
							</span>
							<div
								className={`flex items-center text-xs font-medium ${stat.trendColor} ${stat.bgColor} px-2 py-1 rounded-full`}>
								{stat.trend === "up" ? (
									<TrendingUp size={14} className='mr-1' />
								) : (
									<TrendingDown size={14} className='mr-1' />
								)}
								{stat.change}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Main Table Section */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
				{/* Table Header / Toolbar */}
				<div className='p-5 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4'>
					<h2 className='text-xl font-bold text-gray-900 w-full lg:w-auto'>
						Events
					</h2>

					<div className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto'>
						{/* Filter Buttons Group */}
						<div className='flex gap-2 w-full sm:w-auto'>
							<Button
								variant='outline'
								className='h-10 text-gray-600 gap-2 bg-white flex-1 sm:flex-none'>
								<Filter size={16} />
								Filter By
							</Button>
							<Button
								variant='outline'
								className='h-10 text-gray-600 gap-2 bg-white flex-1 sm:flex-none'>
								<Calendar size={16} />
								Date
								<ChevronDown size={14} />
							</Button>
						</div>

						{/* Add Event Button */}
						<Button className='h-10 bg-gray-900 text-white hover:bg-black gap-2 shadow-sm w-full sm:w-auto'  onClick={() => setIsAddEventOpen(true)}>
							Add Event
							<Plus size={16} />
						</Button>
					</div>
				</div>

				{/* Table Content */}
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow className='bg-gray-50/50 hover:bg-gray-50/50 border-gray-100'>
								<TableHead className='font-bold text-gray-900 pl-6 h-12'>
									Event Name
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Category
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12 w-[300px]'>
									Description
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12 whitespace-nowrap'>
									Date
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12 whitespace-nowrap'>
									Time
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Location
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12'>
									Facilitator(s)
								</TableHead>
								<TableHead className='font-bold text-gray-900 h-12 pr-6 text-right'>
									Status
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{eventsData.map((event) => (
								<TableRow
									key={event.id}
									className='hover:bg-gray-50/50 border-gray-100 transition-colors'>
									<TableCell className='font-semibold text-gray-900 pl-6 py-4 align-top'>
										{event.name}
									</TableCell>
									<TableCell className='text-gray-600 py-4 align-top'>
										{event.category}
									</TableCell>
									<TableCell className='text-gray-600 py-4 align-top text-sm leading-relaxed'>
										{event.description}
									</TableCell>
									<TableCell className='text-gray-600 py-4 align-top whitespace-nowrap text-sm'>
										{event.date}
									</TableCell>
									<TableCell className='text-gray-600 py-4 align-top whitespace-nowrap text-sm'>
										{event.time}
									</TableCell>
									<TableCell className='text-gray-600 py-4 align-top text-sm'>
										{event.location}
									</TableCell>
									<TableCell className='text-gray-600 py-4 align-top text-sm'>
										{event.facilitators}
									</TableCell>
									<TableCell className='pr-6 py-4 align-top text-right'>
										<StatusBadge status={event.status} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{/* Pagination Footer */}
				<div className='p-4 border-t border-gray-100 flex items-center justify-center'>
					<div className='flex items-center gap-2'>
						<button className='px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 disabled:opacity-50'>
							Previous
						</button>
						<button className='w-8 h-8 flex items-center justify-center text-xs font-medium bg-gray-900 text-white rounded-lg shadow-sm'>
							1
						</button>
						<button className='w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
							2
						</button>
						<button className='w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
							3
						</button>
						<button className='w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'>
							4
						</button>
						<button className='px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900'>
							Next
						</button>
					</div>
				</div>
			</div>
      <AddEvent 
        open={isAddEventOpen} 
        onOpenChange={setIsAddEventOpen}
      />
		</div>
	);
}
