// This is the old EmployeeDashboard component for reference not used in actual deployment , I have enhanced it and moved it to EmployeeDashboard

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { currentEmployee } = useSelector(state => state.employee);
  const { employeeActivities } = useSelector(state => state.activities);
  const { mentorships } = useSelector(state => state.mentorship);

  const userActivities = employeeActivities.filter(activity => activity.employeeId === currentEmployee?.id);
  const completedActivities = userActivities.filter(activity => activity.status === 'Completed');
  const ongoingActivities = userActivities.filter(activity => activity.status === 'Ongoing');
  const pendingActivities = userActivities.filter(activity => activity.status === 'Pending');

  const userMentorship = mentorships.find(mentorship => mentorship.menteeId === currentEmployee?.id);

  // Sample chart data for competency gaps
  const competencyData = [
    { skill: 'Technical', current: 80, target: 90 },
    { skill: 'Leadership', current: 60, target: 85 },
    { skill: 'Communication', current: 70, target: 80 },
    { skill: 'Project Management', current: 55, target: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">Here's your IDP progress overview</p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/idp-generator"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate IDP
            </Link>
            <Link
              to="/activities"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Browse Activities
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedActivities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">{ongoingActivities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingActivities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">{currentEmployee?.performanceScore || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Gap Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Competency Gap Analysis</h2>
          <div className="space-y-4">
            {competencyData.map((item, index) => {
              const gap = item.target - item.current;
              const percentage = (item.current / item.target) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.skill}</span>
                    <span className="text-gray-500">{item.current}/{item.target} ({Math.round(percentage)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage >= 80 ? 'bg-green-500' : 
                        percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Gap: {gap} points {gap > 0 && `(${gap > 10 ? 'High' : gap > 5 ? 'Medium' : 'Low'} priority)`}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Link
              to="/idp-generator"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View detailed analysis →
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {userActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'Completed' ? 'bg-green-500' :
                    activity.status === 'Ongoing' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Activity #{activity.activityId}</p>
                    <p className="text-xs text-gray-500">{activity.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{activity.progress}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${activity.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            {userActivities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No activities yet</p>
                <Link to="/activities" className="text-blue-600 hover:text-blue-800 text-sm">
                  Browse available activities
                </Link>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Link
              to="/activities"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all activities →
            </Link>
          </div>
        </div>
      </div>

      {/* Mentorship Section */}
      {userMentorship && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mentorship Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userMentorship.sessions.length}</div>
              <div className="text-sm text-gray-600">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userMentorship.sessions.length > 0 ? Math.round((userMentorship.sessions.length / 6) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Program Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userMentorship.goals.length}</div>
              <div className="text-sm text-gray-600">Goals Set</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <Link
              to="/mentorship"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View mentorship details →
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/profile"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium text-gray-900">Update Profile</div>
          </Link>
          <Link
            to="/idp-generator"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-gray-900">Generate IDP</div>
          </Link>
          <Link
            to="/activities"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-900">Find Activities</div>
          </Link>
          <Link
            to="/mentorship"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🤝</div>
            <div className="text-sm font-medium text-gray-900">Mentorship</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
