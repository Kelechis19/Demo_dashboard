import React from 'react';
import { X } from 'lucide-react';

export function CreateProgramModal({ onClose }) {
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