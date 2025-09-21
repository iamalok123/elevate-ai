import { createSlice } from '@reduxjs/toolkit';

// Sample employee data
const sampleEmployees = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    experience: 5,
    performanceScore: 85,
    profilePicture: null,
    currentRole: 'Senior Software Engineer',
    targetRole: 'Tech Lead',
    competencies: {
      technical: 80,
      leadership: 60,
      communication: 70,
      projectManagement: 55,
    },
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Creation'],
    experience: 3,
    performanceScore: 90,
    profilePicture: null,
    currentRole: 'Marketing Specialist',
    targetRole: 'Marketing Manager',
    competencies: {
      technical: 70,
      leadership: 75,
      communication: 90,
      projectManagement: 80,
    },
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    department: 'Sales',
    designation: 'Sales Representative',
    skills: ['CRM', 'Negotiation', 'Client Relations', 'Analytics'],
    experience: 4,
    performanceScore: 88,
    profilePicture: null,
    currentRole: 'Sales Representative',
    targetRole: 'Sales Manager',
    competencies: {
      technical: 65,
      leadership: 70,
      communication: 95,
      projectManagement: 75,
    },
  },
];

const roleRequirements = {
  'Tech Lead': {
    technical: 90,
    leadership: 85,
    communication: 80,
    projectManagement: 90,
  },
  'Marketing Manager': {
    technical: 70,
    leadership: 90,
    communication: 95,
    projectManagement: 85,
  },
  'Sales Manager': {
    technical: 60,
    leadership: 85,
    communication: 95,
    projectManagement: 80,
  },
  'Product Manager': {
    technical: 75,
    leadership: 80,
    communication: 85,
    projectManagement: 90,
  },
};

const initialState = {
  employees: sampleEmployees,
  currentEmployee: null,
  roleRequirements,
  targetRoles: ['Tech Lead', 'Marketing Manager', 'Sales Manager', 'Product Manager'],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...action.payload };
      }
      if (state.currentEmployee && state.currentEmployee.id === action.payload.id) {
        state.currentEmployee = { ...state.currentEmployee, ...action.payload };
      }
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { setCurrentEmployee, updateEmployee, addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
