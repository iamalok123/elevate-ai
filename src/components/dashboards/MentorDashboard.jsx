import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { employees } = useSelector(state => state.employee);
  const { mentorships, mentors } = useSelector(state => state.mentorship);

  const currentMentor = mentors.find(mentor => mentor.id === user?.id);
  const mentorMentorships = mentorships.filter(mentorship => mentorship.mentorId === user?.id);
  const activeMentorships = mentorMentorships.filter(m => m.status === 'Active');

  const getMenteeName = (menteeId) => {
    const mentee = employees.find(emp => emp.id === menteeId);
    return mentee?.name || 'Unknown';
  };

  const totalSessions = mentorMentorships.reduce((total, mentorship) => total + mentorship.sessions.length, 0);
  const avgSessionDuration = mentorMentorships.length > 0 
    ? Math.round(mentorMentorships.reduce((total, mentorship) => {
        const totalDuration = mentorship.sessions.reduce((sum, session) => sum + session.duration, 0);
        return total + totalDuration;
      }, 0) / totalSessions)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Mentor Dashboard - Track your mentees' progress</p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/mentorship"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Manage Mentorships
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Mentees</p>
              <p className="text-2xl font-bold text-gray-900">{activeMentorships.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">⏱️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Session Time</p>
              <p className="text-2xl font-bold text-gray-900">{avgSessionDuration}min</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Slots</p>
              <p className="text-2xl font-bold text-gray-900">{currentMentor?.availableSlots || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Mentorships */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Mentorships</h2>
          <div className="space-y-4">
            {activeMentorships.map((mentorship) => {
              const menteeName = getMenteeName(mentorship.menteeId);
              const progress = Math.round((mentorship.sessions.length / 6) * 100); // Assuming 6-month program
              const daysRemaining = Math.ceil((new Date(mentorship.endDate) - new Date()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={mentorship.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{menteeName}</h3>
                    <span className="text-sm text-gray-500">{daysRemaining} days left</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{mentorship.sessions.length} sessions completed</span>
                    <span>{progress}% progress</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {mentorship.goals.slice(0, 2).map((goal, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {goal}
                      </span>
                    ))}
                    {mentorship.goals.length > 2 && (
                      <span className="text-xs text-gray-500">+{mentorship.goals.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
            {activeMentorships.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No active mentorships</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h2>
          <div className="space-y-3">
            {mentorMentorships.flatMap(mentorship => 
              mentorship.sessions.slice(-3).map(session => ({
                ...session,
                menteeName: getMenteeName(mentorship.menteeId)
              }))
            ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map((session) => (
              <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{session.menteeName}</h4>
                  <span className="text-xs text-gray-500">{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{session.duration} minutes</p>
                <p className="text-xs text-gray-700 line-clamp-2">{session.notes}</p>
                {session.actionItems.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Action items: {session.actionItems.length}</span>
                  </div>
                )}
              </div>
            ))}
            {mentorMentorships.every(m => m.sessions.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p>No sessions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mentorship Goals Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mentorship Goals Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeMentorships.map((mentorship) => {
            const menteeName = getMenteeName(mentorship.menteeId);
            return (
              <div key={mentorship.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">{menteeName}</h3>
                <div className="space-y-2">
                  {mentorship.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t">
                  <Link
                    to="/mentorship"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/mentorship"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm font-medium text-gray-900">Add Session Notes</div>
          </Link>
          <Link
            to="/mentorship"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-gray-900">Update Goals</div>
          </Link>
          <Link
            to="/profile"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium text-gray-900">Update Profile</div>
          </Link>
          <Link
            to="/mentorship"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium text-gray-900">View Reports</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
