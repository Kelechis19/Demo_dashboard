"use client";

import React from "react";
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white md:rounded-2xl shadow-sm md:m-4 md:mb-0 sticky top-0 z-20">
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative hidden md:block flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 relative hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}