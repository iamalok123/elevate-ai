import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMentorshipSession, updateMentorshipSession, createMentorship } from '../../store/slices/mentorshipSlice';

const Mentorship = () => {
  const { user, role } = useSelector(state => state.auth);
  const { employees } = useSelector(state => state.employee);
  const { mentorships, mentors } = useSelector(state => state.mentorship);
  const dispatch = useDispatch();

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    duration: 60,
    notes: '',
    actionItems: []
  });
  const [newActionItem, setNewActionItem] = useState('');

  // Get user's mentorships based on role
  const userMentorships = role === 'mentor' 
    ? mentorships.filter(m => m.mentorId === user?.id)
    : mentorships.filter(m => m.menteeId === user?.id);

  const getMenteeName = (menteeId) => {
    const mentee = employees.find(emp => emp.id === menteeId);
    return mentee?.name || 'Unknown';
  };

  const getMentorName = (mentorId) => {
    const mentor = mentors.find(m => m.id === mentorId);
    return mentor?.name || 'Unknown';
  };

  const handleAddSession = () => {
    if (!selectedMentorship) return;

    const sessionData = {
      ...sessionForm,
      actionItems: sessionForm.actionItems.filter(item => item.trim())
    };

    dispatch(addMentorshipSession({
      mentorshipId: selectedMentorship.id,
      session: sessionData
    }));

    setSessionForm({
      date: new Date().toISOString().split('T')[0],
      duration: 60,
      notes: '',
      actionItems: []
    });
    setShowSessionModal(false);
    setSelectedMentorship(null);
  };

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      setSessionForm({
        ...sessionForm,
        actionItems: [...sessionForm.actionItems, newActionItem.trim()]
      });
      setNewActionItem('');
    }
  };

  const handleRemoveActionItem = (index) => {
    setSessionForm({
      ...sessionForm,
      actionItems: sessionForm.actionItems.filter((_, i) => i !== index)
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysRemaining = (endDate) => {
    const days = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mentorship</h1>
            <p className="text-gray-600">
              {role === 'mentor' 
                ? 'Manage your mentees and track progress' 
                : 'View your mentorship program and sessions'
              }
            </p>
          </div>
          {role === 'mentor' && (
            <button
              onClick={() => {
                setSelectedMentorship(userMentorships[0]); // For demo, select first mentorship
                setShowSessionModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={userMentorships.length === 0}
            >
              Add Session Notes
            </button>
          )}
        </div>
      </div>

      {/* Mentorship Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userMentorships.map((mentorship) => {
          const progress = Math.round((mentorship.sessions.length / 6) * 100); // Assuming 6-month program
          const daysRemaining = getDaysRemaining(mentorship.endDate);
          const otherPersonName = role === 'mentor' ? getMenteeName(mentorship.menteeId) : getMentorName(mentorship.mentorId);

          return (
            <div key={mentorship.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {role === 'mentor' ? 'Mentoring' : 'Mentored by'} {otherPersonName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {formatDate(mentorship.startDate)} - {formatDate(mentorship.endDate)}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  mentorship.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {mentorship.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Program Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {mentorship.sessions.length} sessions completed • {daysRemaining} days remaining
                </div>
              </div>

              {/* Goals */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Goals</h3>
                <div className="space-y-1">
                  {mentorship.goals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Sessions */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Sessions</h3>
                <div className="space-y-2">
                  {mentorship.sessions.slice(-2).map((session) => (
                    <div key={session.id} className="p-2 bg-gray-50 rounded text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{formatDate(session.date)}</span>
                        <span>{session.duration} min</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{session.notes}</p>
                      {session.actionItems.length > 0 && (
                        <div className="mt-1 text-gray-500">
                          {session.actionItems.length} action item(s)
                        </div>
                      )}
                    </div>
                  ))}
                  {mentorship.sessions.length === 0 && (
                    <p className="text-xs text-gray-500">No sessions yet</p>
                  )}
                </div>
              </div>

              {role === 'mentor' && (
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedMentorship(mentorship);
                      setShowSessionModal(true);
                    }}
                    className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Add Session Notes →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Session History */}
      {userMentorships.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Session History</h2>
          <div className="space-y-4">
            {userMentorships.map((mentorship) => (
              <div key={mentorship.id}>
                <h3 className="font-medium text-gray-900 mb-2">
                  {role === 'mentor' ? 'Sessions with' : 'Sessions with'} {role === 'mentor' ? getMenteeName(mentorship.menteeId) : getMentorName(mentorship.mentorId)}
                </h3>
                <div className="space-y-3">
                  {mentorship.sessions.map((session) => (
                    <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-gray-900">{formatDate(session.date)}</span>
                          <span className="text-sm text-gray-500">{session.duration} minutes</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Session Notes:</h4>
                        <p className="text-sm text-gray-600">{session.notes}</p>
                      </div>

                      {session.actionItems.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Action Items:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {session.actionItems.map((item, index) => (
                              <li key={index} className="text-sm text-gray-600">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  {mentorship.sessions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No sessions recorded yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add Session Notes - {selectedMentorship && (role === 'mentor' ? getMenteeName(selectedMentorship.menteeId) : getMentorName(selectedMentorship.mentorId))}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={sessionForm.date}
                      onChange={(e) => setSessionForm({...sessionForm, date: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={sessionForm.duration}
                      onChange={(e) => setSessionForm({...sessionForm, duration: parseInt(e.target.value)})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Notes
                  </label>
                  <textarea
                    rows="4"
                    value={sessionForm.notes}
                    onChange={(e) => setSessionForm({...sessionForm, notes: e.target.value})}
                    placeholder="Describe what was discussed in this session..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Items
                  </label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newActionItem}
                        onChange={(e) => setNewActionItem(e.target.value)}
                        placeholder="Add action item..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddActionItem()}
                      />
                      <button
                        type="button"
                        onClick={handleAddActionItem}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    
                    {sessionForm.actionItems.length > 0 && (
                      <div className="space-y-1">
                        {sessionForm.actionItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{item}</span>
                            <button
                              onClick={() => handleRemoveActionItem(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowSessionModal(false);
                    setSelectedMentorship(null);
                    setSessionForm({
                      date: new Date().toISOString().split('T')[0],
                      duration: 60,
                      notes: '',
                      actionItems: []
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSession}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentorship;
