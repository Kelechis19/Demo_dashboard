import React from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';

export function ProgramCard({ program, onViewDetails, onNotify }) {
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
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 grow">{program.description}</p>

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