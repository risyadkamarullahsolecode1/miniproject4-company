import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/templates/Layout';
import Dashboard from './components/pages/Dashboard';
import EmployeesList from './components/pages/EmployeeList';
import AddEmployee from './components/pages/AddEmployee';
import EditEmployee from './components/pages/EditEmployee';
import { EmployeeProvider } from './context/EmployeeContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { ProjectProvider } from './context/ProjectContext';
import { WorksOnProvider } from './context/WorksOnContext';
import DepartmentList from './components/pages/DepartmentList';
import ProjectList from './components/pages/ProjectList';
import WorksOnList from './components/pages/WorksOnList';
import AddDepartment from './components/pages/AddDepartment';
import AddProject from './components/pages/AddProject';
import AddWorksOn from './components/pages/AddWorksOn';
import EditDepartment from './components/pages/EditDepartment';
import DepartmentDetails from './components/pages/DepartmentDetails';
import EditProject from './components/pages/EditProject';
import EmployeeDetails from './components/pages/EmployeeDetails';
import ProjectDetails from './components/pages/ProjectDetails';
import WorksOnDetails from './components/pages/WorksOnDetails';
import EditWorksOn from './components/pages/EditWorksOn';

function App() {
  return (
    <Router>
        <EmployeeProvider>
          <DepartmentProvider>
            <ProjectProvider>
              <WorksOnProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/employees" element={<EmployeesList />} />
                            <Route path="/employees/new" element={<AddEmployee />} />
                            <Route path="/employees/:empNo" element={<EmployeeDetails />} />
                            <Route path="/employees/edit/:id" element={<EditEmployee />} />
                            <Route path="/departments" element={<DepartmentList />} />
                            <Route path="/departments/new" element={<AddDepartment />} />
                            <Route path="/departments/:deptNo" element={<DepartmentDetails />} />
                            <Route path="/departments/edit/:id" element={<EditDepartment />} />
                            <Route path="/projects" element={<ProjectList />} />
                            <Route path="/projects/new" element={<AddProject />} />
                            <Route path="/projects/:projNo" element={<ProjectDetails />} />
                            <Route path="/projects/edit/:id" element={<EditProject />} />
                            <Route path="/worksons" element={<WorksOnList />} />
                            <Route path="/worksons/new" element={<AddWorksOn />} />
                            <Route path="/workson/:empNo/:projNo" element={<WorksOnDetails />} />
                            <Route path="/workson/edit/:empNo/:projNo" element={<EditWorksOn />} />
                        </Routes>
                    </Layout>
                </WorksOnProvider>
              </ProjectProvider>
            </DepartmentProvider>
        </EmployeeProvider>
    </Router>
  )
}

export default App
