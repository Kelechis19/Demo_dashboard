"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  DollarSign, 
  Upload, 
  Users, 
  List, 
  RotateCcw, 
  Lock, 
  Trash2, 
  Plus, 
  Save 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SystemPreferences() {
  // Fiscal Year Settings State
  const [fiscalYearMonth, setFiscalYearMonth] = useState("April");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  // Toggle States
  const [csvImportEnabled, setCsvImportEnabled] = useState(false);
  const [autoAgeGroupingEnabled, setAutoAgeGroupingEnabled] = useState(false);

  // Age Groups State
  const [ageGroups, setAgeGroups] = useState([
    { id: 1, label: "Children", min: 0, max: 12 },
    { id: 2, label: "Youth", min: 13, max: 17 },
    { id: 3, label: "Young Adults", min: 18, max: 24 },
    { id: 4, label: "Adults", min: 25, max: 64 },
  ]);

  // Default values for reset functionality
  const defaultSettings = {
    fiscalYearMonth: "April",
    dateFormat: "MM/DD/YYYY",
    csvImportEnabled: false,
    autoAgeGroupingEnabled: false,
    ageGroups: [
      { id: 1, label: "Children", min: 0, max: 12 },
      { id: 2, label: "Youth", min: 13, max: 17 },
      { id: 3, label: "Young Adults", min: 18, max: 24 },
      { id: 4, label: "Adults", min: 25, max: 64 },
    ]
  };

  // Handlers for Fiscal Year Settings
  const handleSaveFiscalSettings = () => {
    const fiscalData = {
      fiscalYearMonth,
      dateFormat
    };

    console.log('Saving fiscal settings:', fiscalData);
    
    // In production, make API call here
    // await fetch('/api/settings/fiscal', { method: 'POST', body: JSON.stringify(fiscalData) });
    
    toast.success('Fiscal settings saved successfully!', {
      description: `Fiscal year starts in ${fiscalYearMonth}, using ${dateFormat} format`
    });
  };

  // Handler for CSV Import Toggle
  const handleCsvImportToggle = () => {
    const newValue = !csvImportEnabled;
    setCsvImportEnabled(newValue);
    
    console.log('CSV Import toggled:', newValue);
    
    if (newValue) {
      toast.success('CSV Import enabled', {
        description: 'You can now import bulk data using CSV files'
      });
    } else {
      toast.info('CSV Import disabled', {
        description: 'Bulk data imports are now disabled'
      });
    }
  };

  // Handler for Auto-Age-Grouping Toggle
  const handleAutoAgeGroupingToggle = () => {
    const newValue = !autoAgeGroupingEnabled;
    setAutoAgeGroupingEnabled(newValue);
    
    console.log('Auto-Age-Grouping toggled:', newValue);
    
    if (newValue) {
      toast.success('Auto-Age-Grouping enabled', {
        description: 'Participants will be automatically categorized by age'
      });
    } else {
      toast.info('Auto-Age-Grouping disabled', {
        description: 'Manual age group assignment required'
      });
    }
  };

  // Handler for Age Group Updates
  const handleUpdateAgeGroup = (id, field, value) => {
    setAgeGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === id ? { ...group, [field]: value } : group
      )
    );
  };

  // Handler for Deleting Age Group
  const handleDeleteGroup = (id) => {
    if (ageGroups.length <= 1) {
      toast.error('Cannot delete', {
        description: 'At least one age group must remain'
      });
      return;
    }

    const groupToDelete = ageGroups.find(g => g.id === id);
    setAgeGroups(ageGroups.filter(group => group.id !== id));
    
    toast.success('Age group deleted', {
      description: `"${groupToDelete?.label}" has been removed`
    });
  };

  // Handler for Adding New Age Group
  const handleAddGroup = () => {
    const newId = Math.max(...ageGroups.map(g => g.id), 0) + 1;
    const newGroup = { id: newId, label: "New Group", min: 0, max: 0 };
    
    setAgeGroups([...ageGroups, newGroup]);
    
    toast.success('Age group added', {
      description: 'Configure the new age group details'
    });
  };

  // Handler for Saving Age Groups
  const handleSaveAgeGroups = () => {
    // Validation
    const invalidGroups = ageGroups.filter(group => {
      return !group.label.trim() || group.min < 0 || group.max < 0 || group.min > group.max;
    });

    if (invalidGroups.length > 0) {
      toast.error('Invalid age groups', {
        description: 'Please ensure all groups have valid names and age ranges (min ≤ max)'
      });
      return;
    }

    // Check for overlapping ranges
    const sortedGroups = [...ageGroups].sort((a, b) => a.min - b.min);
    for (let i = 0; i < sortedGroups.length - 1; i++) {
      if (sortedGroups[i].max >= sortedGroups[i + 1].min) {
        toast.error('Overlapping age ranges', {
          description: `"${sortedGroups[i].label}" and "${sortedGroups[i + 1].label}" have overlapping ranges`
        });
        return;
      }
    }

    console.log('Saving age groups:', ageGroups);
    
    // In production, make API call here
    // await fetch('/api/settings/age-groups', { method: 'POST', body: JSON.stringify({ ageGroups }) });
    
    toast.success('Age groups saved', {
      description: `${ageGroups.length} age group${ageGroups.length > 1 ? 's' : ''} configured successfully`
    });
  };

  // Handler for Reset to Defaults
  const handleResetToDefaults = () => {
    // Show confirmation toast with action
    toast.warning('Reset all settings?', {
      description: 'This will reset all system preferences to default values. This cannot be undone.',
      action: {
        label: 'Confirm Reset',
        onClick: () => {
          // Reset all states
          setFiscalYearMonth(defaultSettings.fiscalYearMonth);
          setDateFormat(defaultSettings.dateFormat);
          setCsvImportEnabled(defaultSettings.csvImportEnabled);
          setAutoAgeGroupingEnabled(defaultSettings.autoAgeGroupingEnabled);
          setAgeGroups(defaultSettings.ageGroups);

          console.log('Settings reset to defaults');
          
          // In production, make API call here
          // await fetch('/api/settings/reset', { method: 'POST' });
          
          toast.success('Settings reset complete', {
            description: 'All system preferences have been restored to defaults'
          });
        }
      },
      duration: 5000
    });
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      
      {/* 1. Fiscal Year Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Fiscal Year Settings</h3>
              <p className="text-sm text-gray-500">Configure fiscal year and date format preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fiscal Year Start Month</label>
                <select 
                  value={fiscalYearMonth}
                  onChange={(e) => setFiscalYearMonth(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
                >
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date Format</label>
                <select 
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div>
              <Button 
                onClick={handleSaveFiscalSettings}
                className="bg-green-600 hover:bg-green-700 text-white gap-2 cursor-pointer"
              >
                <Save size={16} />
                Save Fiscal Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Currency Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Currency Settings</h3>
              <p className="text-sm text-gray-500">System currency configuration</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Currency: CAD (Canadian Dollar)</p>
              <p className="text-xs text-gray-500 mt-1">Currency is locked to CAD for all financial transactions and reporting</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs font-medium text-gray-600">
              <Lock size={12} />
              Locked
            </div>
          </div>
        </div>
      </div>

      {/* 3. CSV Data Import */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Upload className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">CSV Data Import</h3>
              <p className="text-sm text-gray-500">Enable bulk data imports using CSV files</p>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Enable CSV Import</p>
                <p className="text-xs text-gray-500">
                  {csvImportEnabled 
                    ? "✓ CSV import is enabled - Bulk data imports are available" 
                    : "Allow bulk data imports for youth enrollment and program data"}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleCsvImportToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer ${csvImportEnabled ? 'bg-gray-900' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${csvImportEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* 4. Auto-Age-Grouping */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Auto-Age-Grouping</h3>
              <p className="text-sm text-gray-500">Automatically categorize participants by age</p>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Enable Auto-Age-Grouping</p>
                <p className="text-xs text-gray-500">
                  {autoAgeGroupingEnabled 
                    ? "✓ Auto-grouping is enabled - Participants are categorized automatically" 
                    : "Automatically categorize participants based on their age"}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAutoAgeGroupingToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer ${autoAgeGroupingEnabled ? 'bg-gray-900' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAgeGroupingEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* 5. Default Age Groups */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <List className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Default Age Groups</h3>
                  <p className="text-sm text-gray-500">Configure age group ranges used throughout the system</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {ageGroups.map((group) => (
              <div key={group.id} className="flex items-center gap-4">
                <input
                  type="text"
                  value={group.label}
                  onChange={(e) => handleUpdateAgeGroup(group.id, 'label', e.target.value)}
                  placeholder="Group name"
                  className="flex-1 h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-text"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={group.min}
                    onChange={(e) => handleUpdateAgeGroup(group.id, 'min', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-20 h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-text"
                  />
                  <span className="text-sm text-gray-500">to</span>
                  <input
                    type="number"
                    value={group.max}
                    onChange={(e) => handleUpdateAgeGroup(group.id, 'max', parseInt(e.target.value) || 0)}
                    min="0"
                    className="w-20 h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-text"
                  />
                </div>
                <button 
                  onClick={() => handleDeleteGroup(group.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Delete age group"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="flex gap-3">
              <button 
                onClick={handleAddGroup}
                className="flex-1 py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={16} />
                Add Age Group
              </button>
              
              <Button 
                onClick={handleSaveAgeGroups}
                className="bg-gray-900 hover:bg-gray-800 text-white gap-2 cursor-pointer"
              >
                <Save size={16} />
                Save Age Groups
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Reset to Defaults */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <RotateCcw className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Reset to Defaults</h3>
              <p className="text-sm text-gray-500">Reset all system preferences to default values</p>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-orange-800">
              This action will reset all system settings to their default values. This cannot be undone.
            </p>
          </div>

          <Button 
            onClick={handleResetToDefaults}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            <RotateCcw size={16} className="mr-2" />
            Reset All Settings
          </Button>
        </div>
      </div>

    </div>
  );
}