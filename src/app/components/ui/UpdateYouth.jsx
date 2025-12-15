"use client";

import React from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// 1. Added onSave prop to receive the function from the parent
export function UpdateYouths({ open, onOpenChange, initialData, onSave }) {
  const data = initialData || {};
  const isEditing = !!data.id; // Check if we are editing or adding new
  const formKey = data.id || 'new-entry';
  
  // 2. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a FormData object to grab all inputs at once
    const formData = new FormData(e.target);
    
    // Calculate simple age range logic for display purposes
    const dob = formData.get('dob');
    let ageRange = "Unknown";
    if (dob) {
        const birthYear = new Date(dob).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        if (age <= 17) ageRange = "12-17";
        else if (age <= 25) ageRange = "18-25";
        else ageRange = "26+";
    }

    // Construct the New Youth Object
    const newYouthData = {
        // If editing, keep ID. If new, generate a temp ID (Backend will replace this later)
        id: data.id || `25-${Math.floor(1000 + Math.random() * 9000)}`, 
        name: formData.get('name'),
        age: ageRange, // Derived from DOB
        gender: formData.get('gender'),
        date: formData.get('date'), // Date of intake
        // Map "Intake Completed" to a status for the badge
        status: formData.get('intakeStatus') === 'yes' ? 'Active' : 'Pending', 
        programs: "0 Programs", // Default for new users
        
        // Keep raw data for future editing
        raw: {
            dob: formData.get('dob'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            city: formData.get('city'),
            province: formData.get('province'),
            postalCode: formData.get('postalCode'),
            notes: formData.get('notes'),
        }
    };

    // 3. Send data back to parent
    onSave(newYouthData);
    onOpenChange(false); // Close modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="overflow-y-auto custom-scrollbar">
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white gap-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {isEditing ? "Update Youth Profile" : "New Youth Enrollment"}
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
          {/* Added onSubmit handler */}
          <form key={formKey} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Row 1 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Youth ID (auto-generated)</label>
              <input 
                type="text" 
                name="id"
                defaultValue={data.id || "Auto-generated"}
                readOnly 
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input 
                required
                name="name"
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
                required
                name="dob"
                type="date" 
                defaultValue={data.dob}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <div className="relative">
                <select 
                  name="gender"
                  defaultValue={data.gender || ""}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Two-Spirit">Two-Spirit</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
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
                required
                name="date"
                type="date" 
                defaultValue={data.date || new Date().toISOString().split('T')[0]} // Default to today
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Service Category</label>
              <div className="relative">
                <select name="service" className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all">
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
                name="phone"
                type="tel" 
                placeholder="Enter phone number" 
                defaultValue={data.phone}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input 
                name="email"
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
                name="city"
                type="text" 
                placeholder="Enter city" 
                defaultValue={data.city}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Province</label>
              <input 
                name="province"
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
                name="postalCode"
                type="text" 
                placeholder="Enter postal code" 
                defaultValue={data.postalCode}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Intake Completed?</label>
              <div className="relative">
                <select name="intakeStatus" className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
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
                name="notes"
                placeholder="Enter Notes" 
                defaultValue={data.notes}
                className="w-full px-3 py-2 border border-gray-200 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all resize-none"
              ></textarea>
            </div>

            {/* Footer Action */}
            <div className="col-span-1 md:col-span-2 pt-4">
              <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800 py-6 text-base font-medium cursor-pointer">
                {isEditing ? "Update Youth" : "Complete Enrollment"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}