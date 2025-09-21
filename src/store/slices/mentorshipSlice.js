import { createSlice } from '@reduxjs/toolkit';

// Sample mentorship data
const sampleMentorships = [
  {
    id: 1,
    mentorId: 4,
    menteeId: 1,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    status: 'Active',
    goals: [
      'Develop leadership skills',
      'Improve project management',
      'Career advancement planning',
    ],
    sessions: [
      {
        id: 1,
        date: '2024-01-15',
        duration: 60,
        notes: 'Discussed career goals and identified key areas for development. Recommended leadership training program.',
        actionItems: ['Enroll in leadership workshop', 'Take on team lead role for next project'],
      },
      {
        id: 2,
        date: '2024-02-01',
        duration: 45,
        notes: 'Progress review on leadership development. Good improvement in team communication.',
        actionItems: ['Continue with current development plan', 'Schedule monthly check-ins'],
      },
    ],
  },
  {
    id: 2,
    mentorId: 5,
    menteeId: 2,
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    status: 'Active',
    goals: [
      'Marketing strategy development',
      'Team management skills',
      'Industry networking',
    ],
    sessions: [
      {
        id: 3,
        date: '2024-01-20',
        duration: 90,
        notes: 'Initial session focused on marketing strategy and career path. Strong analytical skills noted.',
        actionItems: ['Develop marketing campaign proposal', 'Join industry networking group'],
      },
    ],
  },
];

const mentors = [
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'Engineering',
    designation: 'Principal Engineer',
    expertise: ['Leadership', 'Technical Architecture', 'Team Management'],
    experience: 12,
    availableSlots: 3,
  },
  {
    id: 5,
    name: 'Lisa Brown',
    email: 'lisa.brown@company.com',
    department: 'Marketing',
    designation: 'Marketing Director',
    expertise: ['Marketing Strategy', 'Brand Management', 'Team Leadership'],
    experience: 10,
    availableSlots: 2,
  },
];

const initialState = {
  mentorships: sampleMentorships,
  mentors,
  currentMentorship: null,
};

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {
    setCurrentMentorship: (state, action) => {
      state.currentMentorship = action.payload;
    },
    addMentorshipSession: (state, action) => {
      const { mentorshipId, session } = action.payload;
      const mentorship = state.mentorships.find(m => m.id === mentorshipId);
      if (mentorship) {
        mentorship.sessions.push({
          id: Date.now(),
          ...session,
        });
      }
    },
    updateMentorshipSession: (state, action) => {
      const { mentorshipId, sessionId, updates } = action.payload;
      const mentorship = state.mentorships.find(m => m.id === mentorshipId);
      if (mentorship) {
        const session = mentorship.sessions.find(s => s.id === sessionId);
        if (session) {
          Object.assign(session, updates);
        }
      }
    },
    createMentorship: (state, action) => {
      state.mentorships.push({
        id: Date.now(),
        ...action.payload,
        sessions: [],
      });
    },
    updateMentorshipStatus: (state, action) => {
      const { id, status } = action.payload;
      const mentorship = state.mentorships.find(m => m.id === id);
      if (mentorship) {
        mentorship.status = status;
      }
    },
  },
});

export const {
  setCurrentMentorship,
  addMentorshipSession,
  updateMentorshipSession,
  createMentorship,
  updateMentorshipStatus,
} = mentorshipSlice.actions;
export default mentorshipSlice.reducer;
