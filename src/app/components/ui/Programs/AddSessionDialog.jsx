import React from 'react';
import { X, Bell } from 'lucide-react';

export function AddSessionModal({ program, onClose }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
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