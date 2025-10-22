// This is the production Employee Dashboard component

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProgressChart from '../charts/ProgressChart';
import EnhancedChart from '../charts/EnhancedChart';
import LoadingSpinner from '../ui/LoadingSpinner';
import { SkeletonCard, SkeletonText } from '../ui/Skeleton';

const EnhancedEmployeeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);
  const { currentEmployee } = useSelector(state => state.employee);
  const { employeeActivities } = useSelector(state => state.activities);
  const { mentorships } = useSelector(state => state.mentorship);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const userActivities = employeeActivities.filter(activity => activity.employeeId === currentEmployee?.id);
  const completedActivities = userActivities.filter(activity => activity.status === 'Completed');
  const ongoingActivities = userActivities.filter(activity => activity.status === 'Ongoing');
  const pendingActivities = userActivities.filter(activity => activity.status === 'Pending');

  const userMentorship = mentorships.find(mentorship => mentorship.menteeId === currentEmployee?.id);

  // Sample chart data for competency gaps
  const competencyData = [
    { skill: 'Technical', current: 80, target: 90, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { skill: 'Leadership', current: 60, target: 85, color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { skill: 'Communication', current: 70, target: 80, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { skill: 'Project Management', current: 55, target: 90, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
  ];

  const activityTypeData = [
    { label: 'Completed', value: completedActivities.length, color: 'bg-green-500' },
    { label: 'Ongoing', value: ongoingActivities.length, color: 'bg-blue-500' },
    { label: 'Pending', value: pendingActivities.length, color: 'bg-yellow-500' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Here's your IDP progress overview for today
            </p>
          </div>
          <div className="hidden md:flex space-x-3">
            <Link to="/idp-generator">
              <Button variant="primary" icon="🎯" size="lg">
                Generate IDP
              </Button>
            </Link>
            <Link to="/activities">
              <Button variant="success" icon="📚" size="lg">
                Browse Activities
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover className="border-l-4 border-l-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <span className="text-green-600 text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedActivities.length}</p>
              <p className="text-xs text-green-600 mt-1">+2 this week</p>
            </div>
          </div>
        </Card>

        <Card hover className="border-l-4 border-l-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <span className="text-blue-600 text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ongoing</p>
              <p className="text-3xl font-bold text-gray-900">{ongoingActivities.length}</p>
              <p className="text-xs text-blue-600 mt-1">In progress</p>
            </div>
          </div>
        </Card>

        <Card hover className="border-l-4 border-l-yellow-500">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <span className="text-yellow-600 text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{pendingActivities.length}</p>
              <p className="text-xs text-yellow-600 mt-1">Awaiting approval</p>
            </div>
          </div>
        </Card>

        <Card hover className="border-l-4 border-l-purple-500">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <span className="text-purple-600 text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-3xl font-bold text-gray-900">{currentEmployee?.performanceScore || 0}%</p>
              <p className="text-xs text-purple-600 mt-1">Excellent</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Gap Analysis */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Competency Gap Analysis</h2>
            <Link to="/idp-generator">
              <Button variant="ghost" size="sm">
                View Details →
              </Button>
            </Link>
          </div>
          <div className="space-y-6">
            {competencyData.map((item, index) => {
              const gap = item.target - item.current;
              const percentage = (item.current / item.target) * 100;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{item.skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{item.current}/{item.target}</span>
                      <Badge variant={percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'danger'} size="sm">
                        {Math.round(percentage)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Gap: {gap} points {gap > 0 && (
                      <Badge variant={gap > 15 ? 'danger' : gap > 8 ? 'warning' : 'success'} size="sm" className="ml-2">
                        {gap > 15 ? 'High' : gap > 8 ? 'Medium' : 'Low'} Priority
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Activity Progress Chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Activity Progress</h2>
            <Link to="/activities">
              <Button variant="ghost" size="sm">
                View All →
              </Button>
            </Link>
          </div>
          <EnhancedChart
            data={activityTypeData}
            type="pie"
            animated={true}
          />
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          <Link to="/activities">
            <Button variant="primary" size="sm">
              View All Activities
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {userActivities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'Completed' ? 'bg-green-500' :
                  activity.status === 'Ongoing' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">Activity #{activity.activityId}</p>
                  <p className="text-sm text-gray-500">{activity.status}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{activity.progress}%</div>
                  <ProgressChart
                    value={activity.progress}
                    size="sm"
                    variant="linear"
                    showValue={false}
                    animated={true}
                  />
                </div>
              </div>
            </div>
          ))}
          {userActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
              <p className="text-gray-500 mb-4">Start your development journey by exploring available activities</p>
              <Link to="/activities">
                <Button variant="primary" icon="🔍">
                  Browse Activities
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>

      {/* Mentorship Section */}
      {userMentorship && (
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mentorship Progress</h2>
            <Link to="/mentorship">
              <Button variant="primary" size="sm" icon="🤝">
                View Details
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <ProgressChart
                value={userMentorship.sessions.length * 16.67} // Assuming 6 sessions total
                size="lg"
                variant="circular"
                label="Program Progress"
                color="purple"
                animated={true}
              />
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{userMentorship.sessions.length}</div>
                <div className="text-sm text-gray-600">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{userMentorship.goals.length}</div>
                <div className="text-sm text-gray-600">Goals Set</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 mb-2">Development Goals</h4>
              {userMentorship.goals.slice(0, 3).map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{goal}</span>
                </div>
              ))}
              {userMentorship.goals.length > 3 && (
                <p className="text-xs text-gray-500">+{userMentorship.goals.length - 3} more goals</p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/profile">
            <Card hover className="text-center p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <div className="text-3xl mb-3">👤</div>
              <div className="font-medium text-gray-900">Update Profile</div>
              <div className="text-sm text-gray-500 mt-1">Edit your information</div>
            </Card>
          </Link>
          <Link to="/idp-generator">
            <Card hover className="text-center p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <div className="text-3xl mb-3">🎯</div>
              <div className="font-medium text-gray-900">Generate IDP</div>
              <div className="text-sm text-gray-500 mt-1">Create development plan</div>
            </Card>
          </Link>
          <Link to="/activities">
            <Card hover className="text-center p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <div className="text-3xl mb-3">📚</div>
              <div className="font-medium text-gray-900">Find Activities</div>
              <div className="text-sm text-gray-500 mt-1">Browse learning opportunities</div>
            </Card>
          </Link>
          <Link to="/mentorship">
            <Card hover className="text-center p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <div className="text-3xl mb-3">🤝</div>
              <div className="font-medium text-gray-900">Mentorship</div>
              <div className="text-sm text-gray-500 mt-1">Connect with mentors</div>
            </Card>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedEmployeeDashboard;
