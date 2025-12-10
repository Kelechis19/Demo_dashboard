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
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Mock data - in real app, you'd fetch this based on the eventId
const getEventData = (eventId) => {
	const events = {
		"EV-2025-001": {
			eventId: "EV-2025-001",
			name: "Career Readiness Workshop",
			category: "Leadership Training",
			description: "A workshop to train youth on resume writing and interview prep",
			date: "Jan 15, 2025",
			time: "10:00 AM – 2:00 PM",
			location: "Toronto, ON (YMCA Centre)",
			facilitators: "Sarah Johnson",
			status: "Completed",
			totalAttended: 78,
			participants: [
				{
					youthId: "25-0001",
					name: "Alex Johnson",
					age: "18-25",
					gender: "Male",
					dateRegistered: "2025-05-12",
					status: "Active",
					programs: "5 Programs",
				},
				{
					youthId: "25-0002",
					name: "Mia White",
					age: "12-17",
					gender: "Two-Spirit",
					dateRegistered: "2025-06-03",
					status: "Active",
					programs: "7 Programs",
				},
				{
					youthId: "25-0003",
					name: "Jordan Patel",
					age: "18-25",
					gender: "Non-Binary",
					dateRegistered: "2025-07-18",
					status: "Dropout",
					programs: "9 Programs",
				},
				{
					youthId: "25-0004",
					name: "Sophia Kim",
					age: "18-25",
					gender: "Female",
					dateRegistered: "2025-05-27",
					status: "Completed",
					programs: "22 Programs",
				},
			],
		},
		"EV-2025-002": {
			eventId: "EV-2025-002",
			name: "Digital Skills Bootcamp",
			category: "Training",
			description: "5-day bootcamp on coding & digital literacy",
			date: "Feb 10–14, 2025",
			time: "9:00 AM – 4:00 PM",
			location: "Vancouver, BC (Community Hub)",
			facilitators: "David Chen, Priya Patel",
			status: "Ongoing",
			totalAttended: 45,
			participants: [
				{
					youthId: "25-0001",
					name: "Alex Johnson",
					age: "18-25",
					gender: "Male",
					dateRegistered: "2025-05-12",
					status: "Active",
					programs: "5 Programs",
				},
				{
					youthId: "25-0002",
					name: "Mia White",
					age: "12-17",
					gender: "Two-Spirit",
					dateRegistered: "2025-06-03",
					status: "Active",
					programs: "7 Programs",
				},
			],
		},
	};

	return events[eventId] || null;
};

// Status Badge Component
const StatusBadge = ({ status }) => {
	const styles = {
		Completed: "bg-green-50 text-green-700 border-green-200",
		Ongoing: "bg-blue-50 text-blue-700 border-blue-200",
		Upcoming: "bg-orange-50 text-orange-700 border-orange-200",
		Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
		Dropout: "bg-gray-100 text-gray-500 border-gray-200",
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

export default function EventDetailPage() {
	const params = useParams();
	const router = useRouter();
	const eventId = params.id;

	const event = getEventData(eventId);

	if (!event) {
		return (
			<div className='min-h-screen bg-gray-50 p-6 font-sans'>
				<div className='max-w-7xl mx-auto'>
					<Button
						variant='outline'
						onClick={() => router.back()}
						className='mb-6 gap-2 cursor-pointer'>
						<ArrowLeft size={16} />
						Back to Events
					</Button>
					<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center'>
						<h2 className='text-2xl font-bold text-gray-900 mb-2'>
							Event Not Found
						</h2>
						<p className='text-gray-600'>
							The event with ID "{eventId}" could not be found.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 p-6 font-sans space-y-6'>
			<div className='max-w-7xl mx-auto space-y-6'>
				{/* Back Button */}
				<Button
					variant='outline'
					onClick={() => router.back()}
					className='gap-2 cursor-pointer'>
					<ArrowLeft size={16} />
					Back to Events
				</Button>

				{/* Event Details Card */}
				<div className='bg-white rounded-xl border border-gray-200 shadow-sm p-8'>
					<div className='flex items-center justify-between mb-6'>
						<h1 className='text-2xl font-bold text-gray-900'>Event Details</h1>
						<button className='px-4 py-2 bg-[#2054d2] text-white rounded-lg text-sm font-medium hover:bg-[#2054d2]/90 cursor-pointer'>
							Edit Event
						</button>
					</div>

					{/* Event Info Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Event ID:
							</p>
							<p className='text-sm text-gray-600'>{event.eventId}</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Date & Time:
							</p>
							<p className='text-sm text-gray-600'>
								{event.date} {event.time}
							</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Event Name:
							</p>
							<p className='text-sm text-gray-600'>{event.name}</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>Venue:</p>
							<p className='text-sm text-gray-600'>{event.location}</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Category:
							</p>
							<p className='text-sm text-gray-600'>{event.category}</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Facilitator(s):
							</p>
							<p className='text-sm text-gray-600'>{event.facilitators}</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Description:
							</p>
							<p className='text-sm text-gray-600'>{event.description}</p>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>Status:</p>
							<div className='mt-1'>
								<StatusBadge status={event.status} />
							</div>
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900 mb-1'>
								Total Attended:
							</p>
							<p className='text-sm text-gray-600'>{event.totalAttended}</p>
						</div>
					</div>
				</div>

				{/* Participants Table */}
				{event.participants.length > 0 && (
					<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
						<div className='p-5 border-b border-gray-100'>
							<h2 className='text-xl font-bold text-gray-900'>
								Youth Participants ({event.participants.length})
							</h2>
						</div>

						<div className='overflow-x-auto'>
							<Table>
								<TableHeader>
									<TableRow className='bg-gray-50 hover:bg-gray-50'>
										<TableHead className='font-semibold text-gray-900 pl-6'>
											Youth ID
										</TableHead>
										<TableHead className='font-semibold text-gray-900'>
											Full Name
										</TableHead>
										<TableHead className='font-semibold text-gray-900'>
											Age Range
										</TableHead>
										<TableHead className='font-semibold text-gray-900'>
											Gender
										</TableHead>
										<TableHead className='font-semibold text-gray-900'>
											Date Registered
										</TableHead>
										<TableHead className='font-semibold text-gray-900'>
											Status
										</TableHead>
										<TableHead className='font-semibold text-gray-900'>
											No. of Prog.
										</TableHead>
										<TableHead className='font-semibold text-gray-900 text-right pr-6'>
											Feedback
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{event.participants.map((participant, idx) => (
										<TableRow key={idx} className='hover:bg-gray-50/50'>
											<TableCell className='font-medium text-gray-600 pl-6'>
												{participant.youthId}
											</TableCell>
											<TableCell className='font-medium text-gray-900'>
												{participant.name}
											</TableCell>
											<TableCell className='text-gray-600'>
												{participant.age}
											</TableCell>
											<TableCell className='text-gray-600'>
												{participant.gender}
											</TableCell>
											<TableCell className='text-gray-600'>
												{participant.dateRegistered}
											</TableCell>
											<TableCell>
												<StatusBadge status={participant.status} />
											</TableCell>
											<TableCell className='text-gray-600'>
												{participant.programs}
											</TableCell>
											<TableCell className='text-right pr-6'>
												<button className='text-gray-900 font-medium underline text-sm hover:text-gray-600 cursor-pointer'>
													Update
												</button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}