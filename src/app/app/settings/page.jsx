"use client"
import { useState } from 'react';
import DropdownManagement from '@/app/components/settings/DropdownManagement';
import ReportTemplates from '@/app/components/settings/ReportTemplates';
import SystemPreferences from '@/app/components/settings/SystemPreferences';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('dropdown-management');

  // Tab configuration
  const tabs = [
    { id: 'dropdown-management', label: 'Dropdown Management' },
    { id: 'report-templates', label: 'Report Templates' },
    { id: 'system-preferences', label: 'System Preferences' }
  ];

  return (
    <div className=" bg-gray-50">
      {/* Page Header */}
      <div className="bg-white  border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your system settings and preferences</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white  border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors  cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8 ">
        {activeTab === 'dropdown-management' && <DropdownManagement />}
        {activeTab === 'report-templates' && <ReportTemplates />}
        {activeTab === 'system-preferences' && <SystemPreferences />}
      </div>
    </div>
  );
};

export default Settings;