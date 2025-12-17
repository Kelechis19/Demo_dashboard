import React from 'react';

export function StatCard({ label, value, icon, color }) {
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