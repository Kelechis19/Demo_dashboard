"use client";

import React from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddEvent({ open, onOpenChange, initialData }) {
  // Handle case where initialData is null or undefined
  const data = initialData || {};
  
  // key to reset form state when data changes
  const formKey = data.id || 'new-event';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Program & Activity Participation
          </DialogTitle>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <form key={formKey} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Row 1 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event ID (auto-generated)</label>
              <input 
                type="text" 
                defaultValue={data.id || "25-0001"}
                readOnly 
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/5 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Name</label>
              <input 
                type="text" 
                placeholder="Enter event name" 
                defaultValue={data.eventName}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Category</label>
              <div className="relative">
                <select 
                  defaultValue={data.category || ""}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all cursor-pointer"
                >
                  <option value="">Select Service Category</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="recreation">Recreation</option>
                  <option value="counseling">Group Counseling</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <input 
                type="text" 
                placeholder="Short description of the event" 
                defaultValue={data.description}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Date(s)</label>
              <input 
                type="date" 
                defaultValue={data.date}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Time</label>
              <input 
                type="time" 
                defaultValue={data.time}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all cursor-pointer"
              />
            </div>

            {/* Row 4 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input 
                type="text" 
                placeholder="Enter Location" 
                defaultValue={data.location}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Facilitator(s)</label>
              <input 
                type="text" 
                placeholder="Name of Facilitator(s)" 
                defaultValue={data.facilitator}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Row 5 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Youth Participants</label>
              <div className="relative">
                <select 
                  defaultValue=""
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all cursor-pointer"
                >
                  <option value="" disabled>Click participants that are present</option>
                  <option value="all">Select All Active</option>
                  <option value="group_a">Group A</option>
                  <option value="group_b">Group B</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Feedback Ratings Notes</label>
              <input 
                type="text" 
                placeholder="Enter Notes" 
                defaultValue={data.feedback}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Footer Action - Centered Submit Button */}
            <div className="col-span-1 md:col-span-2 pt-6 flex justify-center">
              <Button 
                type="button" 
                onClick={() => onOpenChange(false)} 
                className="w-full md:w-1/3 bg-gray-900 text-white hover:bg-gray-800 py-6 text-base font-medium cursor-pointer"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}