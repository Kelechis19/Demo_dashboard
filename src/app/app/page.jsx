// src/app/app/page.jsx
"use client";

import React from "react";
import {
	Users,
	Calendar,
	PieChart,
	TrendingUp,
	DollarSign,
	Activity,
} from "lucide-react";
import { DonutChartHero } from "../components/ui/DonutChartHero";
import { ServiceUptake } from "../components/ui/ServiceUptake";
import { KPIScorecard } from "../components/ui/KPIScoreboard";

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, trend, icon: Icon, color }) => {
	return (
		<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full'>
			<div>
				<div className='flex justify-between items-start mb-4'>
					<div className={`p-3 rounded-lg ${color}`}>
						<Icon size={24} className='text-white' />
					</div>
					<span
						className={`flex items-center text-sm font-medium ${
							trend === "up" ? "text-green-600" : "text-red-600"
						}`}>
						{trend === "up" ? "+" : "-"}
						{change}%
						<TrendingUp
							size={16}
							className={`ml-1 ${trend === "down" && "rotate-180"}`}
						/>
					</span>
				</div>
				<h3 className='text-gray-500 text-sm font-medium mb-1'>{title}</h3>
				<p className='text-2xl md:text-3xl font-bold text-gray-900'>{value}</p>
			</div>
		</div>
	);
};

// Reusable Table Component
const RecentActivityTable = () => {
	const activities = [
		{
			id: 1,
			program: "Code for Future",
			type: "Enrollment",
			user: "Sarah Smith",
			date: "2 hours ago",
			status: "Completed",
		},
		{
			id: 2,
			program: "Youth Leadership",
			type: "Workshop",
			user: "Mike Johnson",
			date: "5 hours ago",
			status: "In Progress",
		},
		{
			id: 3,
			program: "Summer Camp",
			type: "Payment",
			user: "Emily Brown",
			date: "1 day ago",
			status: "Pending",
		},
		{
			id: 4,
			program: "STEM Initiative",
			type: "New Session",
			user: "David Wilson",
			date: "1 day ago",
			status: "Completed",
		},
	];

	return (
		<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
			<div className='p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
				<h3 className='text-lg font-bold text-gray-900'>Recent Activity</h3>
				<button className='text-blue-600 text-sm font-medium hover:underline'>
					View All
				</button>
			</div>
			<div className='overflow-x-auto'>
				<table className='w-full min-w-[600px]'>
					<thead className='bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
						<tr>
							<th className='px-6 py-3'>Program</th>
							<th className='px-6 py-3'>Type</th>
							<th className='px-6 py-3'>User</th>
							<th className='px-6 py-3'>Date</th>
							<th className='px-6 py-3'>Status</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100'>
						{activities.map((activity) => (
							<tr
								key={activity.id}
								className='hover:bg-gray-50 transition-colors'>
								<td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
									{activity.program}
								</td>
								<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
									{activity.type}
								</td>
								<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
									{activity.user}
								</td>
								<td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
									{activity.date}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
											activity.status === "Completed"
												? "bg-green-100 text-green-800"
												: activity.status === "Pending"
												? "bg-yellow-100 text-yellow-800"
												: "bg-blue-100 text-blue-800"
										}`}>
										{activity.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

// Main Dashboard Page Component
const DashboardPage = () => {
	return (
		<div className='font-sans'>
			{/* Header Text */}
			<div className='mb-6 md:mb-8'>
				<h1 className='text-2xl font-bold text-gray-900'>Dashboard Overview</h1>
				<p className='text-gray-500'>
					Welcome back, here's what's happening with your programs today.
				</p>
			</div>

			{/* Stats Grid - Responsive Columns */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
				<MetricCard
					title='Total Participants'
					value='2,543'
					change='12.5'
					trend='up'
					icon={Users}
					color='bg-blue-500'
				/>
				<MetricCard
					title='Active Programs'
					value='45'
					change='4.2'
					trend='up'
					icon={Calendar}
					color='bg-indigo-500'
				/>
				<MetricCard
					title='Program Satisfaction'
					value='98%'
					change='1.2'
					trend='up'
					icon={Activity}
					color='bg-green-500'
				/>
				<MetricCard
					title='Budget Utilization'
					value='$124k'
					change='0.8'
					trend='down'
					icon={DollarSign}
					color='bg-orange-500'
				/>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
				{/* Left: Service Uptake Bar List */}
				<ServiceUptake />

				{/* Right: Budget Chart */}
				<DonutChartHero />
			</div>
      <KPIScorecard />

			{/* Content Grid - Stacks on mobile, Side-by-side on desktop */}
			
		</div>
	);
};

export default DashboardPage;
