// src/app/app/layout.jsx
"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        
        {/* Header Component */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 md:pt-4 md:pr-4">
          <div className="bg-white md:rounded-2xl shadow-sm p-6 md:p-8 min-h-[calc(100vh-12rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}