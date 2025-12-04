"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, CheckCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function YouthProfilePage({ params }) {
  // In a real app, you would fetch data using params.id
  // const { id } = params; 

  return (
    <div className=" bg-gray-50 p-6 font-sans">
      
      {/* 1. Back Navigation Header */}
      <div className="mb-6">
        <Link 
          href="/app/youths-enrolled" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium mb-2"
        >
          <ArrowLeft size={20} className="mr-2" />
          Youth Profile
        </Link>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-2">
        
        {/* 2. Basic & Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
          
          {/* Left Column: Basic Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Info</h3>
            
            <div className="space-y-2">
              <Label>Youth ID (auto-generated)</Label>
              <Input value="25-0001" disabled className="bg-gray-50" />
            </div>
            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="John Doe" />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Input defaultValue="Male" />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">Active</span>
                <span className="px-3 py-1 text-gray-400 text-sm">Completed / Dropped Out</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date of registration</Label>
              <Input defaultValue="14 June 2025" />
            </div>
          </div>

          {/* Right Column: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Contact Information</h3>
            
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="Enter full name" />
            </div>

            <div className="space-y-2">
              <Label>Email Number</Label>
              <Input placeholder="Enter full name" />
            </div>

            <div className="space-y-2">
              <Label className="text-purple-600 font-semibold">City</Label>
              <Input className="border-purple-500 ring-2 ring-purple-100" placeholder="Enter full name" />
            </div>

            <div className="space-y-2">
              <Label>Province</Label>
              <Input placeholder="Enter full name" />
            </div>

            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input placeholder="Enter full name" />
            </div>
          </div>
        </div>

        {/* 3. KPI Score Boards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left KPI Board */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-2">KPI score board</h3>
            
            <div className="space-y-2">
              <Label>Intake completed</Label>
              <Input defaultValue="14 June 2025" />
            </div>

            <div className="space-y-2">
              <Label>Programs Attended</Label>
              <Input defaultValue="4 total" />
            </div>

            <div className="space-y-2">
              <Label>Average Intake Days</Label>
              <Input defaultValue="5 days" />
            </div>

             <div className="space-y-2">
              <Label>Dropout Rate</Label>
              <Input defaultValue="0%" />
            </div>
          </div>

          {/* Right KPI Board (Timeline Style) */}
          <div className="space-y-6">
             <h3 className="text-lg font-bold text-gray-900 border-b pb-2">KPI score board</h3>
             
             {/* Timeline Items */}
             <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                  <div className="text-xs font-bold text-gray-500 uppercase">August</div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Calendar size={16} /> June 2025 — Career Development
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <FileText size={16} /> Resume Writing
                  </div>
                   <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} /> Completed, job secured
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                  <div className="text-xs font-bold text-gray-500 uppercase">July</div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Activity size={16} /> Jul 2025 — Mental Health
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Activity size={16} /> Group Counselling Session
                  </div>
                   <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Activity size={16} /> Mood +1.2
                  </div>
                </div>
             </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-end gap-4 border-t pt-6">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800">Save Changes</Button>
        </div>

      </div>
    </div>
  );
}