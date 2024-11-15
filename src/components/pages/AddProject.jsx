import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectForm from '../organisms/ProjectForm';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const { addProject } = useContext(ProjectContext);
    const navigate = useNavigate();

    const handleSubmit = (projectData) => {
        addProject(projectData);
        navigate('/projects');
    };

    return (
        <div>
            <h2>Create New Project</h2>
            <ProjectForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddProject;
