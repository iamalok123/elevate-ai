import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateUser } from '../store/slices/authSlice';
import { setCurrentEmployee } from '../store/slices/employeeSlice';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated, role } = useSelector(state => state.auth);

  const signIn = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validCredentials = {
        'employee': [
          { email: 'alok.hotta@company.com', password: 'iamalok@123', name: 'Alok Hotta', id: 1 },
          { email: 'Sathi.ghatuary@company.com', password: 'iamsathi@123', name: 'Sathi Ghatuary', id: 2 },
          { email: 'yash.sharma@company.com', password: 'iamyash@123', name: 'Yash Sharma', id: 3 },
        ],
        'mentor': [
          { email: 'animesh.sahoo@company.com', password: 'iamanimesh@123', name: 'Animesh Sahoo', id: 4 },
          { email: 'ritesh.das@company.com', password: 'iamritesh@123', name: 'Ritesh Das', id: 5 },
        ],
        'hr': [
          { email: 'hr@company.com', password: 'password123', name: 'HR Manager', id: 6 },
        ],
      };

      const roleUsers = validCredentials[credentials.role] || [];
      const user = roleUsers.find(u => 
        u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const userData = { ...user, role: credentials.role };
        dispatch(login(userData));
        
        if (credentials.role === 'employee') {
          dispatch(setCurrentEmployee(userData));
        }
        
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const updateUserProfile = (updates) => {
    dispatch(updateUser(updates));
  };

  const isRole = (checkRole) => role === checkRole;
  const hasRole = (roles) => roles.includes(role);

  return {
    user,
    isAuthenticated,
    role,
    loading,
    error,
    signIn,
    signOut,
    updateUserProfile,
    isRole,
    hasRole,
    clearError: () => setError(null)
  };
};
