import { createSlice } from '@reduxjs/toolkit';

// Sample activities data
const sampleActivities = [
  {
    id: 1,
    title: 'Advanced React Training',
    type: 'Training',
    description: 'Comprehensive React training covering hooks, context, and performance optimization',
    duration: '2 weeks',
    status: 'Available',
    category: 'Technical',
    prerequisites: ['Basic React knowledge'],
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    id: 2,
    title: 'Leadership Workshop',
    type: 'Training',
    description: 'Leadership skills development program for aspiring managers',
    duration: '3 days',
    status: 'Available',
    category: 'Leadership',
    prerequisites: ['2+ years experience'],
    maxParticipants: 15,
    currentParticipants: 8,
  },
  {
    id: 3,
    title: 'Cross-functional Rotation',
    type: 'Job Rotation',
    description: '3-month rotation to Product Management team',
    duration: '3 months',
    status: 'Available',
    category: 'Career Development',
    prerequisites: ['Senior level', 'Manager approval'],
    maxParticipants: 5,
    currentParticipants: 2,
  },
  {
    id: 4,
    title: 'Mentorship Program',
    type: 'Mentorship',
    description: 'Pair with senior leader for career guidance',
    duration: '6 months',
    status: 'Available',
    category: 'Career Development',
    prerequisites: ['Performance score > 80'],
    maxParticipants: 25,
    currentParticipants: 18,
  },
];

const employeeActivities = [
  {
    id: 1,
    employeeId: 1,
    activityId: 1,
    status: 'Completed',
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    progress: 100,
    feedback: 'Excellent training program. Gained valuable insights into React best practices.',
  },
  {
    id: 2,
    employeeId: 1,
    activityId: 2,
    status: 'Ongoing',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    progress: 60,
    feedback: '',
  },
  {
    id: 3,
    employeeId: 2,
    activityId: 4,
    status: 'Ongoing',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 45,
    feedback: '',
  },
];

const initialState = {
  activities: sampleActivities,
  employeeActivities,
  notifications: [
    {
      id: 1,
      title: 'Training Deadline Approaching',
      message: 'Advanced React Training deadline is in 3 days',
      type: 'warning',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: 2,
      title: 'New Activity Available',
      message: 'Leadership Workshop is now open for registration',
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false,
    },
  ],
};

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    applyForActivity: (state, action) => {
      const { employeeId, activityId } = action.payload;
      const newActivity = {
        id: Date.now(),
        employeeId,
        activityId,
        status: 'Pending',
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        feedback: '',
      };
      state.employeeActivities.push(newActivity);
    },
    updateActivityProgress: (state, action) => {
      const { id, progress, status, feedback } = action.payload;
      const activity = state.employeeActivities.find(a => a.id === id);
      if (activity) {
        activity.progress = progress;
        if (status) activity.status = status;
        if (feedback) activity.feedback = feedback;
      }
    },
    assignActivity: (state, action) => {
      const { employeeId, activityId, startDate, endDate } = action.payload;
      const newActivity = {
        id: Date.now(),
        employeeId,
        activityId,
        status: 'Assigned',
        startDate,
        endDate,
        progress: 0,
        feedback: '',
      };
      state.employeeActivities.push(newActivity);
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
});

export const {
  applyForActivity,
  updateActivityProgress,
  assignActivity,
  markNotificationRead,
  addNotification,
} = activitySlice.actions;
export default activitySlice.reducer;
