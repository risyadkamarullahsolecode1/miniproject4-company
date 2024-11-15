import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectForm from '../organisms/ProjectForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditProject = () => {
    const { projects, editProject } = useContext(ProjectContext);
    const { Id } = useParams();
    const navigate = useNavigate();

    console.log(Id);
    console.log(projects);

    const project = projects.find((proj) => proj.projNo === parseInt(Id));
    console.log(project);
    
    const handleSubmit = (updatedData) => {
        const updatedProject = { ...project, ...updatedData };
        editProject(updatedProject);
        navigate('/projects');
    };

    return (
        <div>
            <h2>Edit Project</h2>
            {project ? (
                <ProjectForm onSubmit={handleSubmit} initialData={project} />
            ):(
            <p>Project not found</p>
            )}
        </div>
    );
};

export default EditProject;
