import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmployee } from '../../store/slices/employeeSlice';
import { updateUser } from '../../store/slices/authSlice';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const { currentEmployee, employees } = useSelector(state => state.employee);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentEmployee?.name || user?.name || '',
    email: currentEmployee?.email || user?.email || '',
    department: currentEmployee?.department || '',
    designation: currentEmployee?.designation || '',
    skills: currentEmployee?.skills?.join(', ') || '',
    experience: currentEmployee?.experience || 0,
    performanceScore: currentEmployee?.performanceScore || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    const updatedEmployee = {
      ...currentEmployee,
      ...formData,
      skills: skillsArray,
    };

    dispatch(updateEmployee(updatedEmployee));
    dispatch(updateUser({ name: formData.name, email: formData.email }));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setFormData({
      name: currentEmployee?.name || user?.name || '',
      email: currentEmployee?.email || user?.email || '',
      department: currentEmployee?.department || '',
      designation: currentEmployee?.designation || '',
      skills: currentEmployee?.skills?.join(', ') || '',
      experience: currentEmployee?.experience || 0,
      performanceScore: currentEmployee?.performanceScore || 0,
    });
    setIsEditing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload to a server
      // For demo purposes, we'll just show a success message
      alert('Profile picture uploaded successfully!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="mx-auto w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                {currentEmployee?.profilePicture ? (
                  <img
                    src={currentEmployee.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-500">
                    {currentEmployee?.name?.charAt(0) || user?.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              
              {isEditing && (
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}
              
              <h2 className="text-xl font-bold text-gray-900">
                {currentEmployee?.name || user?.name}
              </h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{currentEmployee?.experience || 0} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Performance</span>
                <span className="font-medium">{currentEmployee?.performanceScore || 0}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Skills</span>
                <span className="font-medium">{currentEmployee?.skills?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={!isEditing}
                    min="0"
                    max="50"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label htmlFor="performanceScore" className="block text-sm font-medium text-gray-700 mb-2">
                    Performance Score (%)
                  </label>
                  <input
                    type="number"
                    id="performanceScore"
                    name="performanceScore"
                    value={formData.performanceScore}
                    onChange={handleChange}
                    disabled={!isEditing}
                    min="0"
                    max="100"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated)
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  rows="3"
                  value={formData.skills}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="JavaScript, React, Node.js, Python..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Skills Display */}
      {currentEmployee?.skills && currentEmployee.skills.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {currentEmployee.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Competency Overview */}
      {currentEmployee?.competencies && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Competency Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(currentEmployee.competencies).map(([competency, score]) => (
              <div key={competency} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 capitalize">
                    {competency.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-gray-500">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      score >= 80 ? 'bg-green-500' : 
                      score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
