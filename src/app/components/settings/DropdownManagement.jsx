"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DropdownManagement() {
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Counseling' },
    { id: 2, name: 'Cultural Programs' },
    { id: 3, name: 'Mental Health Support' },
    { id: 4, name: 'Career Development' },
    { id: 5, name: 'Land-Based Activities' },
    { id: 6, name: 'Financial Literacy' },
    { id: 7, name: 'Educational Support' },
    { id: 8, name: 'Recreation Programs' }
  ]);

  const [genderOptions, setGenderOptions] = useState([
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Non-Binary' },
    { id: 4, name: 'Two-Spirit' },
    { id: 5, name: 'Prefer not to say' }
  ]);

  const [newProgram, setNewProgram] = useState('');
  const [newGender, setNewGender] = useState('');
  const [editingProgram, setEditingProgram] = useState(null);
  const [editingGender, setEditingGender] = useState(null);

  const addProgram = () => {
    if (newProgram.trim()) {
      setPrograms([...programs, { id: Date.now(), name: newProgram }]);
      setNewProgram('');
    }
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const updateProgram = (id, newName) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, name: newName } : p));
    setEditingProgram(null);
  };

  const addGender = () => {
    if (newGender.trim()) {
      setGenderOptions([...genderOptions, { id: Date.now(), name: newGender }]);
      setNewGender('');
    }
  };

  const deleteGender = (id) => {
    setGenderOptions(genderOptions.filter(g => g.id !== id));
  };

  const updateGender = (id, newName) => {
    setGenderOptions(genderOptions.map(g => g.id === id ? { ...g, name: newName } : g));
    setEditingGender(null);
  };

  return (
    <div className="space-y-8">
      {/* Programs Category Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Programs Category</h2>
              <p className="text-sm text-gray-500">Manage program types available for youth enrollment</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {programs.map(program => (
            <div key={program.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              {editingProgram === program.id ? (
                <Input
                  type="text"
                  defaultValue={program.name}
                  onBlur={(e) => updateProgram(program.id, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && updateProgram(program.id, e.target.value)}
                  className="flex-1 mr-2"
                  autoFocus
                />
              ) : (
                <span className="text-gray-700">{program.name}</span>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProgram(program.id)}
                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProgram(program.id)}
                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              value={newProgram}
              onChange={(e) => setNewProgram(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addProgram()}
              placeholder="Add new program type"
              className="flex-1"
            />
            <Button
              onClick={addProgram}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Gender Options Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Gender Options</h2>
              <p className="text-sm text-gray-500">Configure inclusive gender options for youth profiles</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {genderOptions.map(gender => (
            <div key={gender.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              {editingGender === gender.id ? (
                <Input
                  type="text"
                  defaultValue={gender.name}
                  onBlur={(e) => updateGender(gender.id, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && updateGender(gender.id, e.target.value)}
                  className="flex-1 mr-2"
                  autoFocus
                />
              ) : (
                <span className="text-gray-700">{gender.name}</span>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingGender(gender.id)}
                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteGender(gender.id)}
                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGender()}
              placeholder="Add new gender option"
              className="flex-1"
            />
            <Button
              onClick={addGender}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}