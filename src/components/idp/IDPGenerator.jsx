import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmployee } from '../../store/slices/employeeSlice';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import EnhancedChart from '../charts/EnhancedChart';
import ProgressChart from '../charts/ProgressChart';

const IDPGenerator = () => {
  const { currentEmployee, roleRequirements, targetRoles } = useSelector(state => state.employee);
  const dispatch = useDispatch();

  const [selectedTargetRole, setSelectedTargetRole] = useState(currentEmployee?.targetRole || '');
  const [showResults, setShowResults] = useState(false);

  const generateIDP = () => {
    if (!selectedTargetRole || !currentEmployee) return;
    
    // Update employee with target role
    dispatch(updateEmployee({
      ...currentEmployee,
      targetRole: selectedTargetRole
    }));
    
    setShowResults(true);
  };

  const getGapAnalysis = () => {
    if (!selectedTargetRole || !currentEmployee?.competencies) return [];
    
    const requirements = roleRequirements[selectedTargetRole];
    if (!requirements) return [];

    return Object.entries(requirements).map(([competency, target]) => {
      const current = currentEmployee.competencies[competency] || 0;
      const gap = Math.max(0, target - current);
      const priority = gap > 15 ? 'High' : gap > 8 ? 'Medium' : 'Low';
      
      return {
        competency,
        current,
        target,
        gap,
        priority,
        percentage: Math.round((current / target) * 100)
      };
    });
  };

  const getDevelopmentActivities = (gaps) => {
    const activities = [];
    
    gaps.forEach(gap => {
      if (gap.gap > 0) {
        switch (gap.competency) {
          case 'technical':
            activities.push(
              { type: 'Training', title: 'Advanced Technical Training', duration: '2 weeks', priority: gap.priority },
              { type: 'Training', title: 'Technology Certification Program', duration: '1 month', priority: gap.priority }
            );
            break;
          case 'leadership':
            activities.push(
              { type: 'Training', title: 'Leadership Development Workshop', duration: '3 days', priority: gap.priority },
              { type: 'Mentorship', title: 'Executive Mentorship Program', duration: '6 months', priority: gap.priority }
            );
            break;
          case 'communication':
            activities.push(
              { type: 'Training', title: 'Communication Skills Workshop', duration: '2 days', priority: gap.priority },
              { type: 'Training', title: 'Public Speaking Course', duration: '1 week', priority: gap.priority }
            );
            break;
          case 'projectManagement':
            activities.push(
              { type: 'Training', title: 'Project Management Certification', duration: '2 months', priority: gap.priority },
              { type: 'Job Rotation', title: 'Project Lead Assignment', duration: '3 months', priority: gap.priority }
            );
            break;
        }
      }
    });

    return activities;
  };

  const gapAnalysis = getGapAnalysis();
  const developmentActivities = getDevelopmentActivities(gapAnalysis);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'Training': return 'bg-blue-100 text-blue-800';
      case 'Mentorship': return 'bg-purple-100 text-purple-800';
      case 'Job Rotation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 IDP Generator</h1>
            <p className="text-gray-600 text-lg">Create your Individual Development Plan</p>
          </div>
          {showResults && (
            <Button
              variant="secondary"
              onClick={() => setShowResults(false)}
              icon="🔄"
            >
              Generate New IDP
            </Button>
          )}
        </div>
      </Card>

      {!showResults ? (
        /* IDP Generation Form */
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Target Role</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="targetRole" className="block text-sm font-medium text-gray-700 mb-2">
                Choose your target role:
              </label>
              <select
                id="targetRole"
                value={selectedTargetRole}
                onChange={(e) => setSelectedTargetRole(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a target role...</option>
                {targetRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {selectedTargetRole && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-4 text-lg">Role Requirements for {selectedTargetRole}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(roleRequirements[selectedTargetRole]).map(([competency, requirement]) => (
                    <div key={competency} className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <div className="text-sm text-blue-700 capitalize mb-1">
                        {competency.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <ProgressChart
                        value={requirement}
                        size="sm"
                        variant="circular"
                        showValue={true}
                        animated={true}
                        color="blue"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button
              onClick={generateIDP}
              disabled={!selectedTargetRole}
              className="w-full"
              size="lg"
              icon="🚀"
            >
              Generate IDP
            </Button>
          </div>
        </Card>
      ) : (
        /* IDP Results */
        <div className="space-y-6">
          {/* Current vs Target Role */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🎯 Role Transition Plan</h2>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-sm text-gray-600">Current Role</div>
                <div className="text-xl font-bold text-gray-900">{currentEmployee?.currentRole}</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Target Role</div>
                <div className="text-xl font-bold text-blue-600">{selectedTargetRole}</div>
              </div>
            </div>
          </Card>

          {/* Gap Analysis Chart */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Competency Gap Analysis</h2>
            <div className="space-y-6">
              {gapAnalysis.map((gap, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 capitalize text-lg">
                      {gap.competency.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{gap.current}/{gap.target}</span>
                      <Badge variant={gap.priority === 'High' ? 'danger' : gap.priority === 'Medium' ? 'warning' : 'success'} size="sm">
                        {gap.priority} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <ProgressChart
                      value={gap.percentage}
                      size="md"
                      variant="linear"
                      label={`Current: ${gap.current}% | Target: ${gap.target}%`}
                      color="blue"
                      animated={true}
                    />
                    <div className="text-center">
                      <Badge variant="info" size="sm">
                        Gap: {gap.gap} points
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Visual Gap Analysis */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🎨 Visual Gap Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gapAnalysis.map((gap, index) => (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2 capitalize">
                    {gap.competency.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={getPriorityColor(gap.priority)}
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${gap.percentage}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">{gap.percentage}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Gap: {gap.gap}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Development Activities */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📚 Recommended Development Activities</h2>
            <div className="space-y-4">
              {developmentActivities.map((activity, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getActivityTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Duration: {activity.duration}</div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Apply for this activity →
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Plan Timeline */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">⏰ Recommended Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <div className="font-medium text-blue-900">Month 1-2: Foundation Building</div>
                  <div className="text-sm text-blue-700">Focus on high-priority technical skills and basic leadership training</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <div className="font-medium text-green-900">Month 3-4: Skill Development</div>
                  <div className="text-sm text-green-700">Advanced training and mentorship programs</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <div className="font-medium text-purple-900">Month 5-6: Application & Practice</div>
                  <div className="text-sm text-purple-700">Job rotation and practical application of skills</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Export Options */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📄 Export IDP</h2>
            <div className="flex space-x-4">
              <Button variant="danger" icon="📄">
                Export as PDF
              </Button>
              <Button variant="success" icon="📊">
                Export as CSV
              </Button>
              <Button variant="primary" icon="🔗">
                Share IDP
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default IDPGenerator;
