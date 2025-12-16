"use client"
import React, { useState } from 'react';
// 1. IMPORT ROUTER
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// 2. SWITCH TO SONNER
import { toast } from 'sonner';

import { 
  X,
  MapPin,
  Users,
  Calendar,
  Clock,
  Bell,
  Edit,
  Plus,
  CheckCircle2,
  Trash2,
  ArrowLeft
} from 'lucide-react';

const ProgramDetailPage = () => {
  // 3. INITIALIZE ROUTER
  const router = useRouter();
  
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isEditProgramOpen, setIsEditProgramOpen] = useState(false);
  
  const [program, setProgram] = useState({
    id: 1,
    title: 'Traditional Drumming Workshop',
    category: 'Cultural Activity',
    categoryColor: 'bg-blue-100 text-blue-700',
    location: 'Community Center',
    facilitator: 'Elder Thomas Whitehorse',
    description: 'Learn traditional drumming techniques and songs from Elder Thomas Whitehorse. Open to all youth ages 13-24.'
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      date: '2024-12-15',
      time: '14:00 - 16:00',
      participants: 24,
      maxParticipants: 30,
      status: 'Upcoming',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 2,
      date: '2024-12-22',
      time: '14:00 - 16:00',
      participants: 28,
      maxParticipants: 30,
      status: 'Upcoming',
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      id: 3,
      date: '2024-12-08',
      time: '14:00 - 16:00',
      participants: 25,
      maxParticipants: 30,
      attendance: '83%',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 4,
      date: '2024-12-01',
      time: '14:00 - 16:00',
      participants: 22,
      maxParticipants: 30,
      attendance: '88%',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700'
    }
  ]);

  const [newSession, setNewSession] = useState({
    date: '',
    time: '',
    maxParticipants: '30'
  });

  const [editedProgram, setEditedProgram] = useState({
    title: program.title,
    location: program.location,
    facilitator: program.facilitator,
    description: program.description
  });

  const handleAddSession = () => {
    if (!newSession.date || !newSession.time) {
      toast.error("Missing Information", {
        description: "Please fill in date and time for the session",
      });
      return;
    }

    const session = {
      id: sessions.length + 1,
      date: newSession.date,
      time: newSession.time,
      participants: 0,
      maxParticipants: parseInt(newSession.maxParticipants) || 30,
      status: 'Upcoming',
      statusColor: 'bg-blue-100 text-blue-700'
    };

    setSessions([session, ...sessions]);
    setIsAddSessionOpen(false);
    setNewSession({ date: '', time: '', maxParticipants: '30' });

    toast.success("Session Added! 🎉", {
      description: `New session scheduled for ${session.date}`,
    });
  };

  const handleEditProgram = () => {
    if (!editedProgram.title) {
      toast.error("Missing Information", {
        description: "Program title is required",
      });
      return;
    }

    setProgram({
      ...program,
      ...editedProgram
    });
    setIsEditProgramOpen(false);

    toast.success("Program Updated! ✅", {
      description: "Program information has been successfully updated",
    });
  };

  const handleNotifyYouth = (sessionDate) => {
    toast.success("Notification Sent! 🔔", {
      description: `All enrolled youth have been notified about the session on ${sessionDate}`,
    });
  };

  const handleDeleteSession = (sessionId, sessionDate) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    toast.error("Session Deleted", {
      description: `Session scheduled for ${sessionDate} has been removed`,
    });
  };

  const handleBack = () => {
    // 4. USE ROUTER BACK
    router.back();
  };

  const handleEditSession = (sessionId) => {
    toast("Edit Session", {
      description: "Session editing functionality coming soon...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Programs
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setEditedProgram({
                  title: program.title,
                  location: program.location,
                  facilitator: program.facilitator,
                  description: program.description
                });
                setIsEditProgramOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
              Edit Program
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Program Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{program.title}</h1>
            <Badge className={`${program.categoryColor} border-0 font-medium px-3 py-1.5`}>
              {program.category}
            </Badge>
          </div>

          {/* Program Information Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Program Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Location:</div>
                    <div className="font-medium">{program.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-600">Facilitator:</div>
                    <div className="font-medium">{program.facilitator}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-gray-700">{program.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Sessions ({sessions.length})</h2>
          <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
            <Button
              className="bg-gray-400 hover:bg-gray-500 text-white flex items-center gap-2 cursor-pointer"
              onClick={() => setIsAddSessionOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Session
            </Button>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Session</DialogTitle>
                <DialogDescription>
                  Schedule a new session for this program.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="session-date">Date *</Label>
                  <Input
                    id="session-date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                    className="cursor-pointer"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="session-time">Time *</Label>
                  <Input
                    id="session-time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                    placeholder="e.g., 14:00 - 16:00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max-participants">Max Participants</Label>
                  <Input
                    id="max-participants"
                    type="number"
                    value={newSession.maxParticipants}
                    onChange={(e) => setNewSession({...newSession, maxParticipants: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddSessionOpen(false)} className="cursor-pointer">
                  Cancel
                </Button>
                <Button onClick={handleAddSession} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  Add Session
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <Badge className={`${session.statusColor} border-0`}>
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{session.participants} / {session.maxParticipants} participants</span>
                    </div>

                    {session.attendance && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Attendance: {session.attendance}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {session.status === 'Upcoming' && (
                      <>
                        <Button
                          className="bg-gray-400 hover:bg-gray-500 text-white flex items-center gap-2 flex-1 sm:flex-none cursor-pointer"
                          onClick={() => handleNotifyYouth(session.date)}
                        >
                          <Bell className="h-4 w-4" />
                          Notify Youth
                        </Button>
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => handleEditSession(session.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          onClick={() => handleDeleteSession(session.id, session.date)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {session.status === 'Completed' && (
                      <Button variant="outline" disabled>
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sessions.length === 0 && (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <Calendar className="h-12 w-12 text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions yet</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first session</p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  onClick={() => setIsAddSessionOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Session
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Edit Program Dialog */}
      <Dialog open={isEditProgramOpen} onOpenChange={setIsEditProgramOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>
              Update the program information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Program Title *</Label>
              <Input
                id="edit-title"
                value={editedProgram.title}
                onChange={(e) => setEditedProgram({...editedProgram, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={editedProgram.location}
                onChange={(e) => setEditedProgram({...editedProgram, location: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-facilitator">Facilitator</Label>
              <Input
                id="edit-facilitator"
                value={editedProgram.facilitator}
                onChange={(e) => setEditedProgram({...editedProgram, facilitator: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editedProgram.description}
                onChange={(e) => setEditedProgram({...editedProgram, description: e.target.value})}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProgramOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleEditProgram} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramDetailPage;