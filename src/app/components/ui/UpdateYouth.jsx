"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export function UpdateYouths({ open, onOpenChange, initialData }) {
  // Handle case where initialData is null (from parent state) or undefined
  const data = initialData || {};
  
  // Adding a key to the form based on ID ensures the defaultValues reset when switching users.
  const formKey = data.id || 'new-entry';

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="overflow-y-auto  custom-scrollbar">
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden  bg-white gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Youth Enrollment & Intake
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
          {/* The key prop forces React to re-render the form when the youth ID changes */}
          <form key={formKey} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Row 1 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Youth ID (auto-generated)</label>
              <input 
                type="text" 
                defaultValue={data.id || "25-0001"}
                readOnly 
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter full name" 
                defaultValue={data.name}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input 
                type="date" 
                defaultValue={data.dob}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <div className="relative">
                <select 
                  defaultValue={data.gender?.toLowerCase() || ""}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Intake</label>
              <input 
                type="date" 
                defaultValue={data.date}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Service Category</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all">
                  <option value="">Select Service Category</option>
                  <option value="counseling">Counseling</option>
                  <option value="employment">Employment Support</option>
                  <option value="education">Education</option>
                  <option value="housing">Housing</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                placeholder="Enter phone number" 
                defaultValue={data.phone}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                placeholder="Enter email" 
                defaultValue={data.email}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Row 5 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input 
                type="text" 
                placeholder="Enter city" 
                defaultValue={data.city}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Province</label>
              <input 
                type="text" 
                placeholder="Enter province" 
                defaultValue={data.province}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>

            {/* Row 6 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Postal Code</label>
              <input 
                type="text" 
                placeholder="Enter postal code" 
                defaultValue={data.postalCode}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Intake Completed?</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all">
                  <option value="">Select Yes or No</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Row 7 - Full Width */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Notes / Special Needs (optional)</label>
              <textarea 
                placeholder="Enter Notes" 
                defaultValue={data.notes}
                className="w-full px-3 py-2 border border-gray-200 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all resize-none"
              ></textarea>
            </div>

            {/* Footer Action */}
            <div className="col-span-1 md:col-span-2 pt-4">
              <Button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-900 text-white hover:bg-gray-800 py-6 text-base font-medium cursor-pointer">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}