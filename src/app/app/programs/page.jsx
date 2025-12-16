"use client";
import React from 'react'
import  { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Filter, 
  MapPin, 
  Users, 
  Clock, 
  Download, 
  X, 
  CheckCircle, 
  Bell, 
  Phone, 
  Mail, 
  UserCheck 
} from 'lucide-react';

// --- Main Application Component ---
export default function App() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock Data
  const programs = [
    {
      id: 'P001',
      title: 'Traditional Drumming Workshop',
      category: 'Cultural Activity',
      description: 'Learn traditional drumming techniques and songs from Elder Thomas Whitehorse. Open to all youth ages 13-24.',
      location: 'Community Center',
      facilitator: 'Elder Thomas Whitehorse',
      totalParticipants: 86,
      sessions: [
        { id: 'S001', date: '2024-12-15', time: '14:00 - 16:00', participants: 24, capacity: 30, status: 'Upcoming', facilitator: 'Elder Thomas Whitehorse' },
        { id: 'S002', date: '2024-12-22', time: '14:00 - 16:00', participants: 28, capacity: 30, status: 'Upcoming', facilitator: 'Elder Thomas Whitehorse' },
        { id: 'S003', date: '2024-12-08', time: '14:00 - 16:00', participants: 25, capacity: 30, status: 'Completed', facilitator: 'Elder Thomas Whitehorse', attendanceRate: 83 },
        { id: 'S004', date: '2024-12-01', time: '14:00 - 16:00', participants: 22, capacity: 30, status: 'Completed', facilitator: 'Elder Thomas Whitehorse', attendanceRate: 88 },
      ]
    },
    {
      id: 'P002',
      title: 'Mental Health Support Group',
      category: 'Mental Health Program',
      description: 'Safe space for youth to discuss mental health challenges and learn coping strategies.',
      location: 'Wellness Building',
      facilitator: 'Dr. Sarah Thompson',
      totalParticipants: 45,
      sessions: [
        { id: 'S005', date: '2024-12-16', time: '10:00 - 12:00', participants: 15, capacity: 20, status: 'Upcoming', facilitator: 'Dr. Sarah Thompson' },
        { id: 'S006', date: '2024-12-09', time: '10:00 - 12:00', participants: 18, capacity: 20, status: 'Completed', facilitator: 'Dr. Sarah Thompson', attendanceRate: 90 },
      ]
    },
    {
      id: 'P003',
      title: 'Career Development Program',
      category: 'Career Development',
      description: 'Comprehensive career development including resume writing, interview skills, and job search strategies.',
      location: 'Education Center',
      facilitator: 'James Blackbird',
      totalParticipants: 62,
      sessions: [
        { id: 'S007', date: '2024-12-17', time: '13:00 - 15:00', participants: 18, capacity: 25, status: 'Upcoming', facilitator: 'James Blackbird' },
        { id: 'S008', date: '2024-12-20', time: '13:00 - 15:00', participants: 22, capacity: 25, status: 'Upcoming', facilitator: 'James Blackbird' },
      ]
    },
  ];

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

// --- Components ---

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 ${color} text-white rounded-lg`}>
          {icon}
        </div>
        <span className="text-2xl font-bold text-slate-800">{value}</span>
      </div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
    </div>
  );
}

function ProgramCard({ program, onViewDetails, onNotify }) {
  const categoryColors = {
    'Cultural Activity': 'bg-[#e8f4f8] text-[#4a90e2]',
    'Mental Health Program': 'bg-[#f0e6f6] text-[#8e44ad]',
    'Career Development': 'bg-[#fff3cd] text-[#856404]',
    'Land-Based Activity': 'bg-[#d4edda] text-[#155724]',
    'Financial Literacy': 'bg-[#fce8e6] text-[#d4183d]',
  };

  const upcomingSessions = program.sessions.filter(s => s.status === 'Upcoming');
  const nextSession = upcomingSessions[0];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 text-[11px] font-medium rounded ${categoryColors[program.category] || 'bg-slate-100 text-slate-600'}`}>
          {program.category}
        </span>
        <span className="px-2 py-1 text-[11px] font-medium rounded bg-[#e8f4f8] text-[#4a90e2]">
          {program.sessions.length} Sessions
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-slate-800">{program.title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">{program.description}</p>

      {nextSession && (
        <div className="space-y-2 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Next Session</p>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Calendar className="w-4 h-4 text-[#4a90e2]" />
            <span>{nextSession.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Clock className="w-4 h-4 text-[#4a90e2]" />
            <span>{nextSession.time}</span>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-slate-100 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total Participants</span>
          <span className="font-semibold text-slate-700">{program.totalParticipants}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <button 
          onClick={onViewDetails}
          className="flex-1 px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors text-sm font-medium"
        >
          View Sessions
        </button>
        {nextSession && (
          <button 
            onClick={() => onNotify(nextSession)}
            className="px-3 py-2 border border-[#5cb85c] text-[#5cb85c] rounded-lg hover:bg-[#5cb85c] hover:text-white transition-colors"
            title="Notify Youth"
          >
            <Bell className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ProgramDetailsModal({ program, onClose, onNotify }) {
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedSessionForAttendance, setSelectedSessionForAttendance] = useState(null);

  const handleOpenAttendance = (session) => {
    setSelectedSessionForAttendance(session);
    setShowAttendanceModal(true);
  };

  const handleSaveAttendance = (attendanceRecords) => {
    console.log('Attendance saved:', attendanceRecords);
    setShowAttendanceModal(false);
    setSelectedSessionForAttendance(null);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 z-10 flex items-start justify-between shrink-0">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-semibold mb-2 text-slate-800">{program.title}</h2>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded bg-[#e8f4f8] text-[#4a90e2]`}>
                {program.category}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto">
            {/* Program Information */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
              <h3 className="text-base font-semibold mb-3 text-slate-800">Program Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <MapPin className="w-4 h-4 text-[#4a90e2]" />
                  <span className="text-slate-500">Location:</span>
                  <span className="font-medium">{program.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <UserCheck className="w-4 h-4 text-[#4a90e2]" />
                  <span className="text-slate-500">Facilitator:</span>
                  <span className="font-medium">{program.facilitator}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 leading-relaxed">{program.description}</p>
              </div>
            </div>

            {/* Sessions */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Sessions ({program.sessions.length})</h3>
                <button 
                  onClick={() => setShowAddSessionModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Session
                </button>
              </div>
              
              <div className="space-y-3">
                {program.sessions.map((session) => (
                  <SessionCard 
                    key={session.id} 
                    session={session} 
                    onNotify={() => onNotify(session)}
                    onManageAttendance={() => handleOpenAttendance(session)}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
              <button className="flex-1 px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors font-medium">
                Edit Program
              </button>
              <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center font-medium">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddSessionModal && (
        <AddSessionModal program={program} onClose={() => setShowAddSessionModal(false)} />
      )}

      {showAttendanceModal && selectedSessionForAttendance && (
        <SessionAttendanceModal
          sessionId={selectedSessionForAttendance.id}
          sessionDate={selectedSessionForAttendance.date}
          sessionTime={selectedSessionForAttendance.time}
          programTitle={program.title}
          facilitatorName={selectedSessionForAttendance.facilitator || program.facilitator}
          onClose={() => {
            setShowAttendanceModal(false);
            setSelectedSessionForAttendance(null);
          }}
          onSave={handleSaveAttendance}
        />
      )}
    </>
  );
}

function SessionCard({ session, onNotify, onManageAttendance }) {
  const statusColors = {
    'Upcoming': 'bg-[#d1ecf1] text-[#0c5460] border-[#bee5eb]',
    'In Progress': 'bg-[#fff3cd] text-[#856404] border-[#ffeaa7]',
    'Completed': 'bg-[#d4edda] text-[#155724] border-[#c3e6cb]',
    'Cancelled': 'bg-[#f8d7da] text-[#721c24] border-[#f5c6cb]',
  };

  return (
    <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors bg-white">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-sm font-medium text-slate-700">{session.date}</span>
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-sm font-medium text-slate-700">{session.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-4 h-4" />
            <span>{session.participants} / {session.capacity} participants</span>
          </div>
        </div>
        <div className="self-start">
            <span className={`inline-block px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded border ${statusColors[session.status]}`}>
            {session.status}
            </span>
        </div>
      </div>
      
      {session.status === 'Upcoming' && (
        <div className="flex gap-2 mt-4">
          <button 
            onClick={onNotify}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#5cb85c] text-white rounded-lg hover:bg-[#449d44] transition-colors text-xs font-medium"
          >
            <Bell className="w-4 h-4" />
            Notify Youth
          </button>
          <button className="px-3 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium">
            Edit
          </button>
        </div>
      )}
      
      {session.status === 'Completed' && session.attendanceRate && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-[#5cb85c]" />
          <span className="text-slate-600 font-medium">Attendance: {session.attendanceRate}%</span>
        </div>
      )}

      {session.status === 'Completed' && (
        <div className="mt-4">
          <button
            onClick={onManageAttendance}
            className="w-full sm:w-auto px-4 py-2 border border-[#4a90e2] text-[#4a90e2] rounded-lg hover:bg-[#e8f4f8] transition-colors text-xs font-medium"
          >
            Manage Attendance
          </button>
        </div>
      )}
    </div>
  );
}

function CreateProgramModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between shrink-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">Create New Program</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Program Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                placeholder="e.g., Traditional Drumming Workshop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2] bg-white">
                <option>Cultural Activity</option>
                <option>Mental Health Program</option>
                <option>Career Development</option>
                <option>Land-Based Activity</option>
                <option>Financial Literacy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2] min-h-[100px]"
                placeholder="Describe the program..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                  placeholder="e.g., Community Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Facilitator</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                  placeholder="e.g., Elder Thomas Whitehorse"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-200 mt-6">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors font-medium"
              >
                Create Program
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function AddSessionModal({ program, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="border-b border-slate-200 p-6 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-slate-800">Add Session to {program.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                  placeholder="e.g., 14:00 - 16:00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                placeholder="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Facilitator (optional)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2]"
                placeholder={program.facilitator}
              />
            </div>

            <div className="bg-[#e8f4f8] border border-[#bee5eb] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-[#4a90e2] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#4a90e2] mb-1">Automatic Notifications</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All eligible youth will be automatically notified about this new session via SMS and email.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors font-medium"
              >
                Create Session & Notify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function NotificationModal({ session, onClose }) {
  const [notificationMethod, setNotificationMethod] = useState('all');
  const [customMessage, setCustomMessage] = useState('');

  const defaultMessage = `Hi! You're invited to join our upcoming session on ${session.date} at ${session.time}. We have ${session.capacity - session.participants} spots available. Reply YES to confirm your attendance!`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between shrink-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">Notify Youth</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Session Info */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-sm font-medium text-slate-700">{session.date}</span>
              <span className="text-slate-300 mx-1">|</span>
              <Clock className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-sm font-medium text-slate-700">{session.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users className="w-4 h-4" />
              <span>{session.capacity - session.participants} spots available</span>
            </div>
          </div>

          {/* Notification Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Notification Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'all', icon: Bell, label: 'SMS & Email' },
                { id: 'sms', icon: Phone, label: 'SMS Only' },
                { id: 'email', icon: Mail, label: 'Email Only' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setNotificationMethod(method.id)}
                  className={`p-4 border rounded-lg transition-all ${
                    notificationMethod === method.id 
                      ? 'border-[#4a90e2] bg-[#e8f4f8] ring-1 ring-[#4a90e2]' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <method.icon className={`w-6 h-6 mx-auto mb-2 ${notificationMethod === method.id ? 'text-[#4a90e2]' : 'text-slate-400'}`} />
                  <p className={`text-xs font-medium ${notificationMethod === method.id ? 'text-[#4a90e2]' : 'text-slate-600'}`}>{method.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Target Audience</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#4a90e2] rounded focus:ring-[#4a90e2]" />
                <span className="text-sm text-slate-700">All enrolled youth (247)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" className="w-4 h-4 text-[#4a90e2] rounded focus:ring-[#4a90e2]" />
                <span className="text-sm text-slate-700">Previous participants only (86)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" className="w-4 h-4 text-[#4a90e2] rounded focus:ring-[#4a90e2]" />
                <span className="text-sm text-slate-700">Age group: 13-17 only (125)</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Custom Message (optional)</label>
            <textarea 
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2] min-h-[120px] text-sm"
              placeholder={defaultMessage}
            />
            <p className="text-xs text-slate-500 mt-1">
              Leave blank to use default message template
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              className="flex-1 px-4 py-2 bg-[#5cb85c] text-white rounded-lg hover:bg-[#449d44] transition-colors font-medium flex items-center justify-center gap-2"
              onClick={onClose}
            >
              <Bell className="w-4 h-4" />
              Send Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Previously imported SessionAttendanceModal - now implemented here
function SessionAttendanceModal({ sessionId, sessionDate, sessionTime, programTitle, facilitatorName, onClose, onSave }) {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Jordan Rivera', status: 'present', notes: '' },
    { id: 2, name: 'Casey Smith', status: 'absent', notes: '' },
    { id: 3, name: 'Taylor Doe', status: 'present', notes: '' },
    { id: 4, name: 'Alex Johnson', status: 'present', notes: '' },
    { id: 5, name: 'Sam Wilson', status: 'absent', notes: 'Called in sick' },
  ]);

  const toggleStatus = (id) => {
    setParticipants(participants.map(p =>
      p.id === id ? { ...p, status: p.status === 'present' ? 'absent' : 'present' } : p
    ));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
             <div className="flex justify-between items-start">
                 <div>
                    <h2 className="text-xl font-semibold text-slate-800">Attendance: {programTitle}</h2>
                    <p className="text-sm text-slate-500 mt-1">{sessionDate} • {sessionTime} • Facilitator: {facilitatorName}</p>
                 </div>
                 <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
                     <X className="w-5 h-5 text-slate-400" />
                 </button>
             </div>
          </div>
          
          {/* List */}
          <div className="p-6 overflow-y-auto">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-semibold text-slate-700">Participants ({participants.length})</h3>
                 <div className="text-xs text-slate-500">
                     Present: {participants.filter(p => p.status === 'present').length}
                 </div>
             </div>
             <div className="space-y-2">
                {participants.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${p.status === 'present' ? 'bg-[#d4edda] text-[#155724]' : 'bg-[#f8d7da] text-[#721c24]'}`}>
                            {p.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-700">{p.name}</span>
                    </div>
                    <button 
                        onClick={() => toggleStatus(p.id)} 
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                            p.status === 'present' 
                            ? 'bg-[#d4edda] text-[#155724] border border-[#c3e6cb]' 
                            : 'bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb]'
                        }`}
                    >
                        {p.status === 'present' ? 'Present' : 'Absent'}
                    </button>
                    </div>
                ))}
             </div>
          </div>
          
          {/* Footer */}
           <div className="p-6 border-t border-slate-200 flex justify-end gap-3 bg-white sticky bottom-0">
             <button onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">Cancel</button>
             <button onClick={() => onSave(participants)} className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] font-medium text-sm">Save Attendance</button>
           </div>
       </div>
    </div>
  )
}