import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyForActivity, assignActivity, updateActivityProgress } from '../../store/slices/activitySlice';

const ActivityCatalog = () => {
  const { user, role } = useSelector(state => state.auth);
  const { employees } = useSelector(state => state.employee);
  const { activities, employeeActivities } = useSelector(state => state.activities);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const userActivities = employeeActivities.filter(activity => activity.employeeId === user?.id);

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.type === filter || activity.category === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApplyForActivity = (activityId) => {
    dispatch(applyForActivity({ employeeId: user?.id, activityId }));
    alert('Application submitted successfully!');
  };

  const handleAssignActivity = (activityId) => {
    if (!selectedEmployee) {
      alert('Please select an employee');
      return;
    }
    
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days from now
    
    dispatch(assignActivity({
      employeeId: parseInt(selectedEmployee),
      activityId,
      startDate,
      endDate
    }));
    
    setShowAssignModal(false);
    setSelectedEmployee('');
    setSelectedActivity(null);
    alert('Activity assigned successfully!');
  };

  const handleUpdateProgress = (activityId, progress) => {
    const status = progress === 100 ? 'Completed' : progress > 0 ? 'Ongoing' : 'Pending';
    dispatch(updateActivityProgress({
      id: activityId,
      progress,
      status
    }));
  };

  const getActivityStatus = (activityId) => {
    const userActivity = userActivities.find(ua => ua.activityId === activityId);
    return userActivity ? userActivity.status : null;
  };

  const getActivityProgress = (activityId) => {
    const userActivity = userActivities.find(ua => ua.activityId === activityId);
    return userActivity ? userActivity.progress : 0;
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.name || 'Unknown';
  };

  const activityTypes = ['all', 'Training', 'Job Rotation', 'Mentorship'];
  const activityCategories = ['all', 'Technical', 'Leadership', 'Career Development'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {role === 'hr' ? 'Activity Management' : 'Activity Catalog'}
            </h1>
            <p className="text-gray-600">
              {role === 'hr' 
                ? 'Manage and assign development activities' 
                : 'Browse and apply for development activities'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */} 
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {activityTypes.filter(type => type !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {activityCategories.filter(cat => cat !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* My Activities (for employees) */} 
      {role === 'employee' && userActivities.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Activities</h2>
          <div className="space-y-3">
            {userActivities.map((userActivity) => {
              const activity = activities.find(a => a.id === userActivity.activityId);
              if (!activity) return null;

              return (
                <div key={userActivity.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      userActivity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      userActivity.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {userActivity.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{userActivity.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${userActivity.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={userActivity.progress}
                      onChange={(e) => handleUpdateProgress(userActivity.id, parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="%"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => {
          const isApplied = getActivityStatus(activity.id);
          const progress = getActivityProgress(activity.id);
          
          return (
            <div key={activity.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  activity.type === 'Training' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'Job Rotation' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {activity.type}
                </span>
                <span className="text-xs text-gray-500">{activity.category}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{activity.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{activity.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Participants:</span>
                  <span className="font-medium">{activity.currentParticipants}/{activity.maxParticipants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${
                    activity.status === 'Available' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>

              {activity.prerequisites.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
                  <div className="flex flex-wrap gap-1">
                    {activity.prerequisites.map((prereq, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress bar for applied activities */}
              {isApplied && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Your Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {role === 'employee' && !isApplied && activity.status === 'Available' && (
                  <button
                    onClick={() => handleApplyForActivity(activity.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Apply
                  </button>
                )}
                
                {role === 'hr' && (
                  <button
                    onClick={() => {
                      setSelectedActivity(activity);
                      setShowAssignModal(true);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Assign
                  </button>
                )}

                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors text-sm">
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assign Activity Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Assign Activity: {selectedActivity?.title}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employee
                </label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose an employee...</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedEmployee('');
                    setSelectedActivity(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAssignActivity(selectedActivity.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCatalog;
