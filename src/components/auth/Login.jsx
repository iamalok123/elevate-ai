// This is the old login component for reference not used in actual deployment , I have enhanced it and moved it to EnhancedLogin

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { setCurrentEmployee } from '../../store/slices/employeeSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'employee',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation - in real app, this would be API call
    const validCredentials = {
      'employee': [
        { email: 'john.smith@company.com', password: 'password123', name: 'John Smith', id: 1 },
        { email: 'sarah.johnson@company.com', password: 'password123', name: 'Sarah Johnson', id: 2 },
        { email: 'mike.chen@company.com', password: 'password123', name: 'Mike Chen', id: 3 },
      ],
      'mentor': [
        { email: 'david.wilson@company.com', password: 'password123', name: 'David Wilson', id: 4 },
        { email: 'lisa.brown@company.com', password: 'password123', name: 'Lisa Brown', id: 5 },
      ],
      'hr': [
        { email: 'hr@company.com', password: 'password123', name: 'HR Manager', id: 6 },
      ],
    };

    const roleUsers = validCredentials[formData.role] || [];
    const user = roleUsers.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      const userData = { ...user, role: formData.role };
      dispatch(login(userData));
      
      // Set current employee if role is employee
      if (formData.role === 'employee') {
        dispatch(setCurrentEmployee(userData));
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-600">
            <span className="text-white text-xl font-bold">IDP</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Individual Development Plan System
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              >
                <option value="employee">Employee</option>
                <option value="mentor">Mentor</option>
                <option value="hr">HR/Committee</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Employee:</strong> john.smith@company.com / password123</div>
              <div><strong>Mentor:</strong> david.wilson@company.com / password123</div>
              <div><strong>HR:</strong> hr@company.com / password123</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
