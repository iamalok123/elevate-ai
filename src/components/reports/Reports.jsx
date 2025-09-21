import { useState } from 'react';
import { useSelector } from 'react-redux';
import SimpleChart from '../common/SimpleChart';

const Reports = () => {
  const { employees } = useSelector(state => state.employee);
  const { activities, employeeActivities } = useSelector(state => state.activities);
  const { mentorships } = useSelector(state => state.mentorship);

  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  // Calculate statistics
  const totalEmployees = employees.length;
  const totalActivities = employeeActivities.length;
  const completedActivities = employeeActivities.filter(a => a.status === 'Completed').length;
  const ongoingActivities = employeeActivities.filter(a => a.status === 'Ongoing').length;
  const activeMentorships = mentorships.filter(m => m.status === 'Active').length;

  // Department statistics
  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  // Performance statistics
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performanceScore, 0) / totalEmployees;
  const topPerformers = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);

  // Activity completion rates
  const completionRate = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  // Mentorship statistics
  const totalSessions = mentorships.reduce((total, mentorship) => total + mentorship.sessions.length, 0);
  const avgSessionsPerMentorship = activeMentorships > 0 ? Math.round(totalSessions / activeMentorships) : 0;

  const exportReport = () => {
    // In a real app, this would generate and download the actual file
    alert(`${selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} report exported as ${selectedFormat.toUpperCase()}`);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{totalActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">🤝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Mentorships</p>
              <p className="text-2xl font-bold text-gray-900">{activeMentorships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <SimpleChart
          title="Department Distribution"
          type="bar"
          data={Object.entries(departmentStats).map(([department, count]) => ({
            label: department,
            value: count,
            color: 'bg-blue-500'
          }))}
        />
      </div>

      {/* Performance Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{Math.round(avgPerformance)}%</div>
              <div className="text-sm text-gray-600">Average Performance Score</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Top Performers</h4>
            <div className="space-y-2">
              {topPerformers.slice(0, 3).map((employee, index) => (
                <div key={employee.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{employee.name}</span>
                  <span className="font-medium">{employee.performanceScore}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityReport = () => (
    <div className="space-y-6">
      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{completedActivities}</div>
            <div className="text-sm text-gray-600">Completed Activities</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{ongoingActivities}</div>
            <div className="text-sm text-gray-600">Ongoing Activities</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{totalActivities - completedActivities - ongoingActivities}</div>
            <div className="text-sm text-gray-600">Pending Activities</div>
          </div>
        </div>
      </div>

      {/* Activity Types */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Types</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.currentParticipants}/{activity.maxParticipants}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      activity.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMentorshipReport = () => (
    <div className="space-y-6">
      {/* Mentorship Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{activeMentorships}</div>
            <div className="text-sm text-gray-600">Active Mentorships</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{totalSessions}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{avgSessionsPerMentorship}</div>
            <div className="text-sm text-gray-600">Avg Sessions/Mentorship</div>
          </div>
        </div>
      </div>

      {/* Mentorship Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentorship Programs</h3>
        <div className="space-y-4">
          {mentorships.map((mentorship) => {
            const mentee = employees.find(emp => emp.id === mentorship.menteeId);
            const mentor = employees.find(emp => emp.id === mentorship.mentorId);
            const progress = Math.round((mentorship.sessions.length / 6) * 100);
            
            return (
              <div key={mentorship.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {mentor?.name} → {mentee?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(mentorship.startDate).toLocaleDateString()} - {new Date(mentorship.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    mentorship.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {mentorship.status}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  {mentorship.sessions.length} sessions • {mentorship.goals.length} goals
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderEmployeeReport = () => (
    <div className="space-y-6">
      {/* Employee List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Directory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.experience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.performanceScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.skills?.length || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive reports for your organization</p>
          </div>
        </div>
      </div>

      {/* Report Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="overview">Overview Report</option>
              <option value="activities">Activity Report</option>
              <option value="mentorship">Mentorship Report</option>
              <option value="employees">Employee Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Export Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={exportReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Report Preview
        </h2>
        
        {selectedReport === 'overview' && renderOverviewReport()}
        {selectedReport === 'activities' && renderActivityReport()}
        {selectedReport === 'mentorship' && renderMentorshipReport()}
        {selectedReport === 'employees' && renderEmployeeReport()}
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <span className="text-white text-xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm opacity-90">Total Reports</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <span className="text-white text-xl">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm opacity-90">Avg Performance</p>
              <p className="text-2xl font-bold">{Math.round(avgPerformance)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <span className="text-white text-xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm opacity-90">Completion Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <span className="text-white text-xl">🏆</span>
            </div>
            <div className="ml-4">
              <p className="text-sm opacity-90">Top Performer</p>
              <p className="text-2xl font-bold">{topPerformers[0]?.performanceScore || 0}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
