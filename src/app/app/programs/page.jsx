"use client";
import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Download, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle 
} from 'lucide-react';

import { StatCard } from '@/app/components/ui/StatCard';
import { ProgramCard } from '@/app/components/ui/Programs/ProgramCard';
import { ProgramDetailsModal } from '@/app/components/ui/Programs/ProgramDetailsDialog';
import { CreateProgramModal } from '@/app/components/ui/Programs/CreateProgramDialog';
import { NotificationModal } from '@/app/components/ui/Programs/NotificationsDialog';
import { programs } from '@/data/mockdata';

export default function ProgramsPage() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const filteredPrograms = programs.filter(program => 
    filterCategory === 'all' || program.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-semibold mb-2 text-slate-900">Programs & Activities</h1>
            <p className="text-slate-500">Manage cultural activities, programs, and sessions</p>
          </div>
          <button 
            onClick={() => setShowCreateProgramModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors shadow-sm active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Program
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active Programs" value="12" icon={<Calendar className="w-6 h-6" />} color="bg-[#4a90e2]" />
        <StatCard label="Upcoming Sessions" value="24" icon={<Clock className="w-6 h-6" />} color="bg-[#5cb85c]" />
        <StatCard label="Total Participants" value="342" icon={<Users className="w-6 h-6" />} color="bg-[#f0ad4e]" />
        <StatCard label="Avg. Attendance" value="86%" icon={<CheckCircle className="w-6 h-6" />} color="bg-[#8e44ad]" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 bg-white"
            >
              <option value="all">All Categories</option>
              <option value="Cultural Activity">Cultural Activity</option>
              <option value="Mental Health Program">Mental Health Program</option>
              <option value="Career Development">Career Development</option>
              <option value="Land-Based Activity">Land-Based Activity</option>
              <option value="Financial Literacy">Financial Literacy</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">More Filters</span>
              <span className="sm:hidden">Filters</span>
            </button>
          </div>
          <button 
            onClick={() => {/* Export functionality */}}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors w-full md:w-auto"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrograms.map((program) => (
          <ProgramCard 
            key={program.id} 
            program={program} 
            onViewDetails={() => setSelectedProgram(program)}
            onNotify={(session) => {
              setSelectedSession(session);
              setShowNotificationModal(true);
            }}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedProgram && (
        <ProgramDetailsModal 
          program={selectedProgram} 
          onClose={() => setSelectedProgram(null)}
          onNotify={(session) => {
            setSelectedSession(session);
            setShowNotificationModal(true);
          }}
        />
      )}

      {showCreateProgramModal && (
        <CreateProgramModal onClose={() => setShowCreateProgramModal(false)} />
      )}

      {showNotificationModal && selectedSession && (
        <NotificationModal 
          session={selectedSession}
          onClose={() => {
            setShowNotificationModal(false);
            setSelectedSession(null);
          }}
        />
      )}
    </div>
  );
}