import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import employeeSlice from './slices/employeeSlice';
import activitySlice from './slices/activitySlice';
import mentorshipSlice from './slices/mentorshipSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    activities: activitySlice,
    mentorship: mentorshipSlice,
  },
});

export default store;
