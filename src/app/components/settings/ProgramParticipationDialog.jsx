"use client";

import React from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProgramParticipationDialog({ open, onOpenChange, initialData }) {
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
              <Label className="text-sm font-medium text-gray-700">Event ID (auto-generated)</Label>
              <Input 
                type="text" 
                defaultValue={data.id || "25-0001"}
                readOnly 
                className="bg-gray-50 text-gray-500 focus-visible:ring-0 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Event Name</Label>
              <Input 
                type="text" 
                placeholder="Enter event name" 
                defaultValue={data.eventName}
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Event Category</Label>
              <div className="relative">
                <select 
                  defaultValue={data.category || ""}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none"
                >
                  <option value="">Select Service Category</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="recreation">Recreation</option>
                  <option value="counseling">Group Counseling</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <Input 
                type="text" 
                placeholder="Short description of the event" 
                defaultValue={data.description}
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Event Date(s)</Label>
              <Input 
                type="date" 
                defaultValue={data.date}
                className="block w-full text-gray-600 cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Event Time</Label>
              <Input 
                type="time" 
                defaultValue={data.time}
                className="block w-full text-gray-600 cursor-pointer"
              />
            </div>

            {/* Row 4 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Location</Label>
              <Input 
                type="text" 
                placeholder="Enter Location" 
                defaultValue={data.location}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Facilitator(s)</Label>
              <Input 
                type="text" 
                placeholder="Name of Facilitator(s)" 
                defaultValue={data.facilitator}
              />
            </div>

            {/* Row 5 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Youth Participants</Label>
              <div className="relative">
                <select 
                  defaultValue=""
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer appearance-none"
                >
                  <option value="" disabled>Click participants that are present</option>
                  <option value="all">Select All Active</option>
                  <option value="group_a">Group A</option>
                  <option value="group_b">Group B</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Feedback Ratings Notes</Label>
              <Input 
                type="text" 
                placeholder="Enter Notes" 
                defaultValue={data.feedback}
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