export const programs = [
  {
    id: 'P001',
    title: 'Traditional Drumming Workshop',
    category: 'Cultural Activity',
    description: 'Learn traditional drumming techniques and songs from Elder Thomas Whitehorse. Open to all youth ages 13-24.',
    location: 'Community Center',
    facilitator: 'Elder Thomas Whitehorse',
    totalParticipants: 86,
    sessions: [
      { id: 'S001', date: '2024-12-15', time: '14:00 - 16:00', participants: 24, capacity: 30, status: 'Upcoming', facilitator: 'Elder Thomas Whitehorse' },
      { id: 'S002', date: '2024-12-22', time: '14:00 - 16:00', participants: 28, capacity: 30, status: 'Upcoming', facilitator: 'Elder Thomas Whitehorse' },
      { id: 'S003', date: '2024-12-08', time: '14:00 - 16:00', participants: 25, capacity: 30, status: 'Completed', facilitator: 'Elder Thomas Whitehorse', attendanceRate: 83 },
      { id: 'S004', date: '2024-12-01', time: '14:00 - 16:00', participants: 22, capacity: 30, status: 'Completed', facilitator: 'Elder Thomas Whitehorse', attendanceRate: 88 },
    ]
  },
  {
    id: 'P002',
    title: 'Mental Health Support Group',
    category: 'Mental Health Program',
    description: 'Safe space for youth to discuss mental health challenges and learn coping strategies.',
    location: 'Wellness Building',
    facilitator: 'Dr. Sarah Thompson',
    totalParticipants: 45,
    sessions: [
      { id: 'S005', date: '2024-12-16', time: '10:00 - 12:00', participants: 15, capacity: 20, status: 'Upcoming', facilitator: 'Dr. Sarah Thompson' },
      { id: 'S006', date: '2024-12-09', time: '10:00 - 12:00', participants: 18, capacity: 20, status: 'Completed', facilitator: 'Dr. Sarah Thompson', attendanceRate: 90 },
    ]
  },
  {
    id: 'P003',
    title: 'Career Development Program',
    category: 'Career Development',
    description: 'Comprehensive career development including resume writing, interview skills, and job search strategies.',
    location: 'Education Center',
    facilitator: 'James Blackbird',
    totalParticipants: 62,
    sessions: [
      { id: 'S007', date: '2024-12-17', time: '13:00 - 15:00', participants: 18, capacity: 25, status: 'Upcoming', facilitator: 'James Blackbird' },
      { id: 'S008', date: '2024-12-20', time: '13:00 - 15:00', participants: 22, capacity: 25, status: 'Upcoming', facilitator: 'James Blackbird' },
    ]
  },
];

export const categories = [
  'Cultural Activity',
  'Mental Health Program',
  'Career Development',
  'Land-Based Activity',
  'Financial Literacy'
];

export const notificationMethods = [
  { id: 'all', label: 'SMS & Email' },
  { id: 'sms', label: 'SMS Only' },
  { id: 'email', label: 'Email Only' }
];