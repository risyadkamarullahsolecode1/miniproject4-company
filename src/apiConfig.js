import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7073/api', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Employee API
export const getEmployees = () => api.get('/Employee');
export const getEmployeeById = (empno) => api.get(`/Employee/${empno}`);
export const addEmployee = (employeeData) => api.post('/Employee', employeeData);
export const updateEmployee = (empNo, employeeData) => api.put(`/Employee/${empNo}`, employeeData);
export const deleteEmployee = (empNo) => api.delete(`/Employee/${empNo}`);

// Department API
export const getDepartments = () => api.get('/Department');
export const getDepartmentById = (deptNo) => api.get(`/Department/${deptNo}`);
export const addDepartment = (departmentData) => api.post('/Department', departmentData);
export const updateDepartment = (deptno, departmentData) => api.put(`/Department/${deptno}`, departmentData);
export const deleteDepartment = (deptNo) => api.delete(`/Department/${deptNo}`);

// Project API
export const getProjects = () => api.get('/Project');
export const getProjectById = (projNo) => api.get(`/Project/${projNo}`);
export const addProject = (projectData) => api.post('/Project', projectData);
export const updateProject = (projNo, projectData) => api.put(`/Project/${projNo}`, projectData);
export const deleteProject = (projNo) => api.delete(`/Project/${projNo}`);

// WorksOn API
export const getWorksOn = () => api.get('/Workson');
export const getWorksOnById = (empNo, projNo) => api.get(`/Workson/${empNo}/${projNo}`);
export const addWorksOn = (worksOnData) => api.post('/Workson', worksOnData);
export const updateWorksOn = (empNo, projNo , worksOnData) => api.put(`/Workson/${empNo}/${projNo}`, worksOnData);
export const deleteWorksOn = (empNo, projNo) => api.delete(`/Workson/${empNo}/${projNo}`);

export default api;