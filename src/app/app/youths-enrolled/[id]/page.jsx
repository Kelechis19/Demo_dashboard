"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import {
	ArrowLeft,
	Calendar,
	FileText,
	CheckCircle,
	Activity,
	Loader2,
	Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function YouthProfilePage({ params }) {
	const router = useRouter(); // 2. Initialize router

	// State for Form Data
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [formData, setFormData] = useState({
		youthId: "",
		fullName: "",
		gender: "",
		status: "",
		registrationDate: "",
		phone: "",
		email: "",
		city: "",
		province: "",
		postalCode: "",
		// KPIs
		intakeCompleted: "",
		programsAttended: "",
		avgIntakeDays: "",
		dropoutRate: "",
	});

	// Fetch Specific Youth Data
	useEffect(() => {
		const fetchYouthDetails = async () => {
			setIsLoading(true);
			try {
				await new Promise((r) => setTimeout(r, 800));

				setFormData({
					youthId: "25-0001",
					fullName: "John Doe",
					gender: "Male",
					status: "Active",
					registrationDate: "14 June 2025",
					phone: "+1 234 567 8900",
					email: "john.doe@example.com",
					city: "Toronto",
					province: "Ontario",
					postalCode: "M5V 2T6",
					intakeCompleted: "14 June 2025",
					programsAttended: "4 total",
					avgIntakeDays: "5 days",
					dropoutRate: "0%",
				});
			} catch (err) {
				console.error(err);
				toast.error("Failed to load profile", {
					description: "Could not fetch youth details.",
				});
			} finally {
				setIsLoading(false);
			}
		};
		fetchYouthDetails();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// 3. Updated Save Handler with Redirect
	const handleSave = async () => {
		setIsSaving(true);
		try {
			console.log("Sending payload to backend:", formData);

			await new Promise((r) => setTimeout(r, 1000)); // Simulate API wait

			toast.success("Profile updated successfully", {
				description: (
					<>
						Changes for {formData.fullName} have been saved.
						<br />
						Redirecting to enrolled youths list...
					</>
				),
			});

			// Wait 1 second so user sees the success toast, then redirect
			setTimeout(() => {
				router.push("/app/youths-enrolled");
			}, 1000);
		} catch (err) {
			toast.error("Failed to save changes", {
				description:
					"An error occurred while updating the profile. Please try again.",
			});
			setIsSaving(false); // Only stop loading state if error, otherwise keep it during redirect
		}
	};

	if (isLoading) {
		return (
			<div className='h-screen flex items-center justify-center bg-gray-50'>
				<Loader2 className='animate-spin text-gray-500' size={40} />
			</div>
		);
	}

	return (
		<div className='bg-gray-50 p-6 font-sans min-h-screen'>
			{/* Back Navigation Header */}
			<div className='mb-6'>
				<Link
					href='/app/youths-enrolled'
					className='inline-flex items-center text-gray-600 hover:text-gray-900 font-medium mb-2'>
					<ArrowLeft size={20} className='mr-2' />
					Youth Profile
				</Link>
			</div>

			<div className='bg-white rounded-sm shadow-sm border border-gray-100 p-6'>
				{/* Basic & Contact Info Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'>
					{/* Left Column: Basic Info */}
					<div className='space-y-6'>
						<h3 className='text-lg font-bold text-gray-900 border-b pb-2'>
							Basic Info
						</h3>

						<div className='space-y-2'>
							<Label>Youth ID (auto-generated)</Label>
							<Input
								name='youthId'
								value={formData.youthId}
								disabled
								className='bg-gray-50'
							/>
						</div>

						<div className='space-y-2'>
							<Label>Full Name</Label>
							<Input
								name='fullName'
								value={formData.fullName}
								onChange={handleChange}
							/>
						</div>

						<div className='space-y-2'>
							<Label>Gender</Label>
							<Input
								name='gender'
								value={formData.gender}
								onChange={handleChange}
							/>
						</div>

						<div className='space-y-2'>
							<Label>Status</Label>
							<div className='flex gap-2 items-center mb-2'>
								<span
									className={`px-3 py-1 rounded-full text-sm font-medium border ${
										formData.status === "Active"
											? "bg-green-100 text-green-700 border-green-200"
											: "text-gray-400 bg-gray-100"
									}`}>
									Active
								</span>
							</div>
						</div>

						<div className='space-y-2'>
							<Label>Date of registration</Label>
							<Input
								name='registrationDate'
								value={formData.registrationDate}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Right Column: Contact Info */}
					<div className='space-y-6'>
						<h3 className='text-lg font-bold text-gray-900 border-b pb-2'>
							Contact Information
						</h3>

						<div className='space-y-2'>
							<Label>Phone Number</Label>
							<Input
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								placeholder='Enter phone'
							/>
						</div>

						<div className='space-y-2'>
							<Label>Email</Label>
							<Input
								name='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='Enter email'
							/>
						</div>

						<div className='space-y-2'>
							<Label className='text-purple-600 font-semibold'>City</Label>
							<Input
								name='city'
								value={formData.city}
								onChange={handleChange}
								className='border-purple-500 ring-2 ring-purple-100'
							/>
						</div>

						<div className='space-y-2'>
							<Label>Province</Label>
							<Input
								name='province'
								value={formData.province}
								onChange={handleChange}
							/>
						</div>

						<div className='space-y-2'>
							<Label>Postal Code</Label>
							<Input
								name='postalCode'
								value={formData.postalCode}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>

				{/* KPI Score Boards */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
					{/* Left KPI Board */}
					<div className='space-y-6'>
						<h3 className='text-lg font-bold text-gray-900 border-b pb-2'>
							KPI score board
						</h3>

						<div className='space-y-2'>
							<Label>Intake completed</Label>
							<Input
								name='intakeCompleted'
								value={formData.intakeCompleted}
								onChange={handleChange}
							/>
						</div>

						<div className='space-y-2'>
							<Label>Programs Attended</Label>
							<Input
								name='programsAttended'
								value={formData.programsAttended}
								onChange={handleChange}
							/>
						</div>

						<div className='space-y-2'>
							<Label>Average Intake Days</Label>
							<Input
								name='avgIntakeDays'
								value={formData.avgIntakeDays}
								onChange={handleChange}
							/>
						</div>

						<div className='space-y-2'>
							<Label>Dropout Rate</Label>
							<Input
								name='dropoutRate'
								value={formData.dropoutRate}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Right KPI Board (Timeline Style) */}
					<div className='space-y-6'>
						<h3 className='text-lg font-bold text-gray-900 border-b pb-2'>
							Timeline Activity
						</h3>

						{/* Timeline Items */}
						<div className='space-y-4'>
							<div className='bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3'>
								<div className='text-xs font-bold text-gray-500 uppercase'>
									August
								</div>
								<div className='flex items-center gap-3 text-sm text-gray-700'>
									<Calendar size={16} /> June 2025 — Career Development
								</div>
								<div className='flex items-center gap-3 text-sm text-gray-700'>
									<FileText size={16} /> Resume Writing
								</div>
								<div className='flex items-center gap-3 text-sm text-gray-700'>
									<CheckCircle size={16} /> Completed, job secured
								</div>
							</div>

							<div className='bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3'>
								<div className='text-xs font-bold text-gray-500 uppercase'>
									July
								</div>
								<div className='flex items-center gap-3 text-sm text-gray-700'>
									<Activity size={16} /> Jul 2025 — Mental Health
								</div>
								<div className='flex items-center gap-3 text-sm text-gray-700'>
									<Activity size={16} /> Group Counselling Session
								</div>
								<div className='flex items-center gap-3 text-sm text-gray-700'>
									<Activity size={16} /> Mood +1.2
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className='mt-12 flex justify-end gap-4 border-t pt-6'>
					<Button variant='outline' asChild>
						<Link href='/app/youths-enrolled'>Cancel</Link>
					</Button>
					<Button
						className='bg-gray-900 text-white hover:bg-gray-800 w-36 cursor-pointer'
						onClick={handleSave}
						disabled={isSaving}>
						{isSaving ? (
							<Loader2 className='animate-spin mr-2' size={16} />
						) : (
							<Save className='mr-2' size={16} />
						)}
						{isSaving ? "Saving..." : "Save Changes"}
					</Button>
				</div>
			</div>
		</div>
	);
}
