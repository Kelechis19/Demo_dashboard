"use client";

import React from "react";
// Use Link in your real app: import Link from "next/link";
import { ArrowLeft, Shield, Mail, Key, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      
      {/* Centered Container */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* 1. Navigation Header */}
        <div className="flex items-center justify-between">
          <a 
            href="/app/admin" 
            className="group inline-flex items-center text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            <div className="p-2 bg-white border border-gray-200 rounded-lg mr-3 group-hover:border-gray-300 shadow-sm">
               <ArrowLeft size={18} />
            </div>
            <span className="text-lg">Back to Admin List</span>
          </a>
        </div>

        {/* 2. Main Card Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-6 md:p-10 space-y-8">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Update Admin</h1>
                <p className="text-gray-500 mt-1">Manage role, permissions, and account status.</p>
              </div>
              <div className="flex items-center gap-2">
                 <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-bold">
                    Active
                 </span>
              </div>
            </div>

            {/* Form Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Column 1: Personal Info */}
              <div className="space-y-6">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <User size={16} /> Personal Details
                 </h3>
                 
                 <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <Label>Admin ID</Label>
                      <Input value="ADM-001" disabled className="bg-gray-50 font-mono text-gray-600" />
                    </div>

                    <div className="grid gap-1.5">
                      <Label>Full Name</Label>
                      <Input defaultValue="Sarah McKenzie" />
                    </div>

                    <div className="grid gap-1.5">
                      <Label>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input defaultValue="sarah.mck@youthmetrics.com" className="pl-10" />
                      </div>
                    </div>
                 </div>
              </div>

              {/* Column 2: Role & Security */}
              <div className="space-y-6">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <Shield size={16} /> Role & Permissions
                 </h3>

                 <div className="space-y-4">
                    <div className="grid gap-1.5">
                      <Label>Role</Label>
                      <select className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                         <option>Admin</option>
                         <option>Program Manager</option>
                         <option>Data Entry</option>
                         <option>Viewer</option>
                      </select>
                    </div>

                    <div className="grid gap-1.5">
                      <Label>Account Status</Label>
                      <div className="flex gap-4 pt-2">
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" defaultChecked className="accent-gray-900 w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">Active</span>
                         </label>
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" className="accent-red-600 w-4 h-4" />
                            <span className="text-sm font-medium text-gray-700">Suspended</span>
                         </label>
                      </div>
                    </div>

                    <div className="pt-4">
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                           <Key size={16} className="mr-2" /> Reset Password
                        </Button>
                    </div>
                 </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
               <Button variant="ghost" className="text-gray-500 hover:text-gray-700">Cancel</Button>
               <Button className="bg-gray-900 hover:bg-black text-white px-8 h-11">
                 Save Changes
               </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}