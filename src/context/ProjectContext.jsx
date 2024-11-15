import React, { createContext, useEffect, useState } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../apiConfig';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    const addProjectHandler = async (projectData) => {
        try {
            const response = await addProject(projectData);
            setProjects([...projects, response.data]);
        } catch (error) {
            console.error("Error adding project", error);
        }
    };

    const editProjectHandler = async (updatedProject) => {
        try {
            await updateProject(updatedProject.projNo, updatedProject);
            setProjects(
                projects.map((proj) => (proj.projNo === updatedProject.projNo ? updatedProject : proj))
            );
        } catch (error) {
            console.error("Error updating project", error);
        }
    };

    const deleteProjectHandler = async (projNo) => {
        try {
            await deleteProject(projNo); 
            setProjects(projects.filter((proj) => proj.projNo !== projNo)); 
        } catch (error) {
            console.error("Error deleting projects", error);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                addProject: addProjectHandler,
                editProject: editProjectHandler,
                deleteProject: deleteProjectHandler,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
