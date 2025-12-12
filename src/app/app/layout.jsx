"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout({ children }) {
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	return (
		// CHANGE 1: Use 'h-screen' and 'overflow-hidden' to stop the whole browser window from scrolling
		<div className='flex h-screen bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden'>
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsMobileOpen(!isMobileOpen)}
				className='md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg'>
				{isMobileOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Overlay for mobile */}
			{isMobileOpen && (
				<div
					className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Sidebar Component */}
			<Sidebar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />

			<div className='flex-1 flex flex-col h-full w-full'>
				<Header />

				<main className='flex-1 p-4 md:p-8 md:pt-4 md:px-4 overflow-hidden'>
					<div className='bg-white md:rounded-2xl shadow-sm p-6 md:p-8 h-full overflow-y-auto custom-scrollbar custom-scrollbar-cursor-pointer'>
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
