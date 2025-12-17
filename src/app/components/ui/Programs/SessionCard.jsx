import React from 'react';
import { Calendar, Clock, Users, CheckCircle, Bell } from 'lucide-react';

export function SessionCard({ session, onNotify, onManageAttendance }) {
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
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#5cb85c] text-white rounded-lg hover:bg-[#449d44] transition-colors text-xs font-medium cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            Notify Youth
          </button>
          <button className="px-3 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-xs font-medium cursor-pointer">
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