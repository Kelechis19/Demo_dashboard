"use client";

import React, { useState } from "react";
import { FileText, File, Upload, Zap, Save, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportTemplates() {
  // State Management
  const [autoFillEnabled, setAutoFillEnabled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // FNCFS Quarterly Reports State
  const [quarterlyTemplateType, setQuarterlyTemplateType] = useState("");
  const [selectedKPIs, setSelectedKPIs] = useState({
    intakeCompletion: false,
    mentalHealth: false,
    culturalPrograms: false,
    employment: false,
    stableHousing: false
  });

  // Annual Report Templates State
  const [defaultTemplate, setDefaultTemplate] = useState("");
  const [selectedSections, setSelectedSections] = useState({
    executiveSummary: false,
    youthEnrollment: false,
    programOutcomes: false,
    financialOverview: false,
    successStories: false,
    challenges: false
  });

  // Report Header & Footer State
  const [logoFile, setLogoFile] = useState("washagamis-bay-logo.png");
  const [footerText, setFooterText] = useState("");

  // KPI Definitions
  const kpiList = [
    { id: "intakeCompletion", label: "Intake Completion Rate (Target: 90%)" },
    { id: "mentalHealth", label: "Mental Health Improvement Rate (Target: 75%)" },
    { id: "culturalPrograms", label: "Cultural Programs Participation (Target: 60%)" },
    { id: "employment", label: "Employment/Education Enrollment (Target: 70%)" },
    { id: "stableHousing", label: "Stable Housing Rate (Target: 85%)" }
  ];

  // Section Definitions
  const sectionList = [
    { id: "executiveSummary", label: "Executive Summary" },
    { id: "youthEnrollment", label: "Youth Enrollment Statistics" },
    { id: "programOutcomes", label: "Program Outcomes" },
    { id: "financialOverview", label: "Financial Overview" },
    { id: "successStories", label: "Success Stories" },
    { id: "challenges", label: "Challenges & Recommendations" }
  ];

  // Handlers
  const handleKPIToggle = (kpiId) => {
    setSelectedKPIs(prev => ({
      ...prev,
      [kpiId]: !prev[kpiId]
    }));
  };

  const handleSectionToggle = (sectionId) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, or SVG)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      
      setLogoFile(file.name);
      // In production, you would upload the file to your server here
      showSuccess();
    }
  };

  const handleSaveBranding = () => {
    if (!footerText.trim()) {
      alert('Please enter footer text');
      return;
    }

    // In production, save to database/API
    const brandingData = {
      logo: logoFile,
      footerText: footerText
    };
    
    console.log('Saving branding settings:', brandingData);
    showSuccess();
  };

  const handleAutoFillToggle = () => {
    setAutoFillEnabled(prev => !prev);
    
    if (!autoFillEnabled) {
      // When enabling auto-fill, simulate populating KPIs from recent data
      console.log('Auto-fill enabled: Fetching data from last 3 months...');
      // In production, you would fetch actual data from your API
      
      // Auto-select all KPIs when auto-fill is enabled
      setSelectedKPIs({
        intakeCompletion: true,
        mentalHealth: true,
        culturalPrograms: true,
        employment: true,
        stableHousing: true
      });
      
      showSuccess();
    }
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleSaveQuarterlySettings = () => {
    if (!quarterlyTemplateType.trim()) {
      alert('Please enter a template type');
      return;
    }

    const selectedKPIsList = Object.keys(selectedKPIs).filter(key => selectedKPIs[key]);
    
    if (selectedKPIsList.length === 0) {
      alert('Please select at least one KPI to track');
      return;
    }

    const quarterlyData = {
      templateType: quarterlyTemplateType,
      kpis: selectedKPIsList
    };

    console.log('Saving quarterly settings:', quarterlyData);
    showSuccess();
  };

  const handleSaveAnnualSettings = () => {
    if (!defaultTemplate.trim()) {
      alert('Please select a default template');
      return;
    }

    const selectedSectionsList = Object.keys(selectedSections).filter(key => selectedSections[key]);
    
    if (selectedSectionsList.length === 0) {
      alert('Please select at least one section to include');
      return;
    }

    const annualData = {
      defaultTemplate: defaultTemplate,
      sections: selectedSectionsList
    };

    console.log('Saving annual settings:', annualData);
    showSuccess();
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top">
          <Check size={20} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* 1. FNCFS Quarterly Reports Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">FNCFS Quarterly Reports</h3>
              <p className="text-sm text-gray-500">Configure quarterly reporting templates and KPIs</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Report Template Type</label>
              <input
                type="text"
                value={quarterlyTemplateType}
                onChange={(e) => setQuarterlyTemplateType(e.target.value)}
                placeholder="e.g., Q1 2025 Standard Report"
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                KPIs to Track ({Object.values(selectedKPIs).filter(Boolean).length} selected)
              </label>
              <div className="space-y-2">
                {kpiList.map((kpi) => (
                  <label 
                    key={kpi.id} 
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedKPIs[kpi.id]}
                      onChange={() => handleKPIToggle(kpi.id)}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{kpi.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Button 
                onClick={handleSaveQuarterlySettings}
                className="bg-gray-900 hover:bg-gray-800 text-white gap-2 cursor-pointer"
              >
                <Save size={16} />
                Save Quarterly Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Annual Report Templates Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <File className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Annual Report Templates</h3>
              <p className="text-sm text-gray-500">Configure annual report format and sections</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Default Template</label>
              <select
                value={defaultTemplate}
                onChange={(e) => setDefaultTemplate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer"
              >
                <option value="">Select default template</option>
                <option value="comprehensive">Comprehensive Annual Report</option>
                <option value="executive">Executive Summary Format</option>
                <option value="detailed">Detailed Analytics Report</option>
                <option value="custom">Custom Template</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Include Sections ({Object.values(selectedSections).filter(Boolean).length} selected)
              </label>
              <div className="space-y-2">
                {sectionList.map((section) => (
                  <label 
                    key={section.id} 
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedSections[section.id]}
                      onChange={() => handleSectionToggle(section.id)}
                      className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{section.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Button 
                onClick={handleSaveAnnualSettings}
                className="bg-gray-900 hover:bg-gray-800 text-white gap-2 cursor-pointer"
              >
                <Save size={16} />
                Save Annual Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Report Header & Footer Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Upload className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Report Header & Footer</h3>
              <p className="text-sm text-gray-500">Customize report branding and footer information</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Organization Logo</label>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-500">
                  {logoFile}
                </div>
                <label htmlFor="logo-upload">
                  <Button 
                    type="button"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    className="bg-gray-500 hover:bg-gray-600 text-white gap-2 cursor-pointer"
                  >
                    <Upload size={16} />
                    Upload New Logo
                  </Button>
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">Recommended: PNG or SVG, 300x100px, max 5MB</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Report Footer Text</label>
              <textarea
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="flex min-h-20 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="e.g., © 2025 Washagamis Bay Youth Services. All rights reserved. | Contact: info@washagamisbay.ca"
              />
            </div>

            <div>
              <Button 
                onClick={handleSaveBranding}
                className="bg-green-600 hover:bg-green-700 text-white gap-2 cursor-pointer"
              >
                <Save size={16} />
                Save Branding Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Auto-fill KPIs Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Auto-fill KPIs</h3>
              <p className="text-sm text-gray-500">Automatically populate report KPIs using recent data</p>
              <p className="text-xs text-gray-400 mt-1">
                {autoFillEnabled 
                  ? "✓ Auto-fill is enabled - Reports will use data from the last 3 months" 
                  : "Enable Auto-fill to populate report KPIs using data from the last 3 months"}
              </p>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <button 
            onClick={handleAutoFillToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 cursor-pointer ${autoFillEnabled ? 'bg-gray-900' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoFillEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

    </div>
  );
}