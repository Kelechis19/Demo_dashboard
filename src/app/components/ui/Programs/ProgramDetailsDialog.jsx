import React, { useState } from 'react';
import { X, MapPin, UserCheck, Plus, Download } from 'lucide-react';
import { toast } from 'sonner';
import { SessionCard } from './SessionCard';
import { AddSessionModal } from './AddSessionDialog';
import { SessionAttendanceModal } from './SessionAttendanceDialog';

export function ProgramDetailsModal({ program, onClose, onNotify }) {
  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedSessionForAttendance, setSelectedSessionForAttendance] = useState(null);

  const handleOpenAttendance = (session) => {
    setSelectedSessionForAttendance(session);
    setShowAttendanceModal(true);
  };

  const handleSaveAttendance = (attendanceRecords) => {
    console.log('Attendance saved:', attendanceRecords);
    
    toast.success('Attendance records saved successfully', {
      description: `Updated for ${attendanceRecords.length || 'selected'} participants.`
    });

    setShowAttendanceModal(false);
    setSelectedSessionForAttendance(null);
  };

  const handleNotifyWrapper = (session) => {
    if (onNotify) onNotify(session);
    
    toast.success('Notification sent', {
      description: `Participants of "${session.title}" have been notified.`
    });
  };

  const handleExport = () => {
    toast.info('Exporting data...', {
      description: 'Your download will start shortly.'
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Added cursor-pointer here so users know clicking outside closes the modal */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" 
          onClick={onClose} 
        />
        
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
              // Added cursor-pointer
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
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
                  // Added cursor-pointer
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors cursor-pointer"
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
                    onNotify={() => handleNotifyWrapper(session)}
                    onManageAttendance={() => handleOpenAttendance(session)}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 ">
              <button 
                onClick={() => toast("Edit Mode", { description: "Editing functionality is coming soon." })}
                // Added cursor-pointer
                className="flex-1 px-4 py-2 bg-[#4a90e2] text-white rounded-lg hover:bg-[#357abd] transition-colors font-medium cursor-pointer"
              >
                Edit Program
              </button>
              <button 
                onClick={handleExport}
                // Added cursor-pointer
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center font-medium cursor-pointer"
              >
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