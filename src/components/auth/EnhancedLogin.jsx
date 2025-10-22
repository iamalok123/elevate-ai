// This is the production login component

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const EnhancedLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'employee',
  });
  
  const { signIn, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    const result = await signIn(formData);
    if (result.success) {
      // Navigate based on role
      const roleRoutes = {
        employee: '/employee-dashboard',
        mentor: '/mentor-dashboard',
        hr: '/hr-dashboard'
      };
      navigate(roleRoutes[formData.role] || '/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) clearError();
  };

  const demoCredentials = {
    employee: { email: 'alok.hotta@company.com', password: 'iamalok@123' },
    mentor: { email: 'ritesh.das@company.com' , password: 'iamritesh@123' },
    hr: { email: 'hr@company.com', password: 'password123' }
  };

  const fillDemoCredentials = () => {
    const demo = demoCredentials[formData.role];
    setFormData(prev => ({
      ...prev,
      email: demo.email,
      password: demo.password
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <span className="text-white text-2xl font-bold">IDP</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Individual Development Plan account
          </p>
        </div>
        
        <Card className="shadow-xl border-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-400 text-lg">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={fillDemoCredentials}
                className="w-full"
                disabled={loading}
              >
                Fill Demo Credentials
              </Button>
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-3">Demo Credentials:</h3>
          <div className="space-y-2 text-xs text-blue-800">
            <div><strong>Employee:</strong> alok.hotta@company.com / iamalok@123</div>
            <div><strong>Mentor:</strong> ritesh.das@company.com / iamritesh@123</div>
            <div><strong>HR:</strong> hr@company.com / password123</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedLogin;
