import React, { useState } from 'react';
import { X } from 'lucide-react';

export function SessionAttendanceModal({ sessionId, sessionDate, sessionTime, programTitle, facilitatorName, onClose, onSave }) {
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
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
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
  );
}