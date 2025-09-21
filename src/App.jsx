import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';

// Import components
import EnhancedLogin from './components/auth/EnhancedLogin';
import Signup from './components/auth/Signup';
import EnhancedEmployeeDashboard from './components/dashboards/EnhancedEmployeeDashboard';
import MentorDashboard from './components/dashboards/MentorDashboard';
import HRDashboard from './components/dashboards/HRDashboard';
import Profile from './components/profile/Profile';
import IDPGenerator from './components/idp/IDPGenerator';
import ActivityCatalog from './components/activities/ActivityCatalog';
import Mentorship from './components/mentorship/Mentorship';
import EnhancedLayout from './components/layout/EnhancedLayout';
import Reports from './components/reports/Reports';
import NotFound from './components/common/NotFound';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  
  return <EnhancedLayout>{children}</EnhancedLayout>;
};

// Role-based redirect component
const RoleRedirect = () => {
  const { role } = useSelector(state => state.auth);
  
  switch (role) {
    case 'employee':
      return <Navigate to="/employee-dashboard" />;
    case 'mentor':
      return <Navigate to="/mentor-dashboard" />;
    case 'hr':
      return <Navigate to="/hr-dashboard" />;
    default:
      return <Navigate to="/login" />;
  }
};

function AppContent() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <RoleRedirect /> : <EnhancedLogin />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <RoleRedirect /> : <Signup />} 
          />
          
          {/* Protected routes */}
          <Route path="/" element={<RoleRedirect />} />
          
          <Route 
            path="/employee-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EnhancedEmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/mentor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['mentor']}>
                <MentorDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/hr-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['hr']}>
                <HRDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['employee', 'mentor', 'hr']}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/idp-generator" 
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <IDPGenerator />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/activities" 
            element={
              <ProtectedRoute allowedRoles={['employee', 'hr']}>
                <ActivityCatalog />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/mentorship" 
            element={
              <ProtectedRoute allowedRoles={['mentor', 'employee']}>
                <Mentorship />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/reports" 
            element={
              <ProtectedRoute allowedRoles={['hr']}>
                <Reports />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;