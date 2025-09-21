import { createSlice } from '@reduxjs/toolkit';
import { sessionManager } from '../../utils/security';

// Load initial state from secure storage
const loadAuthFromStorage = () => {
  try {
    const session = sessionManager.getSession();
    if (session && session.user) {
      return {
        user: session.user,
        isAuthenticated: true,
        role: session.user.role,
        lastActivity: session.timestamp,
      };
    }
  } catch (error) {
    console.error('Error loading auth from storage:', error);
  }
  return {
    user: null,
    isAuthenticated: false,
    role: null, // 'employee', 'mentor', 'hr'
    lastActivity: null,
  };
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.lastActivity = Date.now();
      
      // Save to secure storage
      sessionManager.createSession(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.lastActivity = null;
      
      // Clear secure session
      sessionManager.clearSession();
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.lastActivity = Date.now();
      
      // Update secure session
      if (state.isAuthenticated) {
        sessionManager.createSession(state.user);
      }
    },
    updateActivity: (state) => {
      state.lastActivity = Date.now();
    },
  },
});

export const { login, logout, updateUser, updateActivity } = authSlice.actions;
export default authSlice.reducer;
