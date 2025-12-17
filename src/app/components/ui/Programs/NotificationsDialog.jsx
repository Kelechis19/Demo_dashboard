import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Bell, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner'; // Import sonner toast

export function NotificationModal({ session, onClose }) {
  const [notificationMethod, setNotificationMethod] = useState('all');
  const [customMessage, setCustomMessage] = useState('');

  const defaultMessage = `Hi! You're invited to join our upcoming session on ${session.date} at ${session.time}. We have ${session.capacity - session.participants} spots available. Reply YES to confirm your attendance!`;

  const handleSend = () => {
    // Determine label for toast description
    const methodLabel = 
      notificationMethod === 'all' ? 'SMS & Email' : 
      notificationMethod === 'sms' ? 'SMS' : 'Email';

    toast.success('Notifications sent successfully', {
      description: `Sent via ${methodLabel} to selected participants.`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Added cursor-pointer to backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer" 
        onClick={onClose} 
      />
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between shrink-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">Notify Youth</h2>
          <button 
            onClick={onClose} 
            // Added cursor-pointer
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Session Info */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-sm font-medium text-slate-700">{session.date}</span>
              <span className="text-slate-300 mx-1">|</span>
              <Clock className="w-4 h-4 text-[#4a90e2]" />
              <span className="text-sm font-medium text-slate-700">{session.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users className="w-4 h-4" />
              <span>{session.capacity - session.participants} spots available</span>
            </div>
          </div>

          {/* Notification Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Notification Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'all', icon: Bell, label: 'SMS & Email' },
                { id: 'sms', icon: Phone, label: 'SMS Only' },
                { id: 'email', icon: Mail, label: 'Email Only' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setNotificationMethod(method.id)}
                  // Added cursor-pointer
                  className={`p-4 border rounded-lg transition-all cursor-pointer ${
                    notificationMethod === method.id 
                      ? 'border-[#4a90e2] bg-[#e8f4f8] ring-1 ring-[#4a90e2]' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <method.icon className={`w-6 h-6 mx-auto mb-2 ${notificationMethod === method.id ? 'text-[#4a90e2]' : 'text-slate-400'}`} />
                  <p className={`text-xs font-medium ${notificationMethod === method.id ? 'text-[#4a90e2]' : 'text-slate-600'}`}>{method.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Target Audience</label>
            <div className="space-y-2">
              {/* Labels already had cursor-pointer, kept them for consistency */}
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#4a90e2] rounded focus:ring-[#4a90e2] cursor-pointer" />
                <span className="text-sm text-slate-700">All enrolled youth (247)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" className="w-4 h-4 text-[#4a90e2] rounded focus:ring-[#4a90e2] cursor-pointer" />
                <span className="text-sm text-slate-700">Previous participants only (86)</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                <input type="checkbox" className="w-4 h-4 text-[#4a90e2] rounded focus:ring-[#4a90e2] cursor-pointer" />
                <span className="text-sm text-slate-700">Age group: 13-17 only (125)</span>
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Custom Message (optional)</label>
            <textarea 
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/20 focus:border-[#4a90e2] min-h-[120px] text-sm"
              placeholder={defaultMessage}
            />
            <p className="text-xs text-slate-500 mt-1">
              Leave blank to use default message template
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onClose}
              // Added cursor-pointer
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button 
              // Added cursor-pointer and changed onClick to handleSend
              className="flex-1 px-4 py-2 bg-[#5cb85c] text-white rounded-lg hover:bg-[#449d44] transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleSend}
            >
              <Bell className="w-4 h-4" />
              Send Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}