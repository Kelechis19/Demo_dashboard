// src/app/youth-services/page.jsx
"use client";

import React, { useState } from "react";
import { KPITableSection } from "@/app/components/ui/KPITableSection";

// Initial Data for "Enrollment & Intake KPIs"
const initialEnrollmentData = [
  {
    kpi: "No. of Intakes Completed",
    may: "403",
    june: "455",
    july: "485",
    trend: "+82 (20%)",
    trendDir: "up",
    notes: "Add Note",
  },
  // ... rest of your enrollment data
  {
    kpi: "Intake Completion Rate (%)",
    may: "78.3%",
    june: "82.1%",
    july: "85.0%",
    trend: "+6.7 pts",
    trendDir: "up",
    notes: "Improved processing flow",
  },
  {
    kpi: "Dropout Rate (%)",
    may: "8.9%",
    june: "8.2%",
    july: "7.8%",
    trend: "-1.1 pts",
    trendDir: "down",
    notes: "Slight improvement",
  },
  {
    kpi: "Average Time to Intake (Days)",
    may: "5.3",
    june: "4.8",
    july: "4.2",
    trend: "-1.1 days",
    trendDir: "down",
    notes: "Digitized intake system",
  },
  {
    kpi: "No. of New Registrations",
    may: "510",
    june: "530",
    july: "550",
    trend: "+40",
    trendDir: "up",
    notes: "Growing program awareness",
  },
];

// Initial Data for "Program Participation KPIs"
const initialParticipationData = [
  {
    kpi: "Total Active Youth",
    may: "1,210",
    june: "1,390",
    july: "1,540",
    trend: "+330 (27%)",
    trendDir: "up",
    notes: "Ongoing engagement rise",
  },
  // ... rest of your participation data
  {
    kpi: "% Actively Participating",
    may: "68%",
    june: "71%",
    july: "74%",
    trend: "+6 pts",
    trendDir: "up",
    notes: "Consistent monthly growth",
  },
  {
    kpi: "No. of Sessions Held",
    may: "85",
    june: "91",
    july: "102",
    trend: "+17",
    trendDir: "up",
    notes: "Added weekend sessions",
  },
  {
    kpi: "Avg. Sessions per Youth",
    may: "3.2",
    june: "3.6",
    july: "3.8",
    trend: "+0.6",
    trendDir: "up",
    notes: "More personalized programs",
  },
  {
    kpi: "Programs with Highest Reach",
    may: "Life Skills",
    june: "Mental Health",
    july: "Life Skills",
    trend: "-",
    trendDir: "neutral",
    notes: "Life Skills has highest reach",
  },
];

export default function YouthServicesPage() {
  // Use state to manage the data for each table
  const [enrollmentData, setEnrollmentData] = useState(initialEnrollmentData);
  const [participationData, setParticipationData] = useState(initialParticipationData);

  return (
    <div className="font-sans min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Youth Services Overview</h1>
        <p className="text-gray-500">
          Detailed breakdown of enrollment, intake, and participation metrics.
        </p>
      </div>

      {/* Table 1: Enrollment & Intake */}
      <KPITableSection 
        title="Enrollment & Intake KPIs" 
        data={enrollmentData} 
        setData={setEnrollmentData} // Pass the setter function
      />

      {/* Table 2: Program Participation */}
      <KPITableSection 
        title="Program Participation KPIs" 
        data={participationData} 
        setData={setParticipationData} // Pass the setter function
      />
    </div>
  );
}