import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectTable from '../organisms/ProjectTable';
import Button from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, Dropdown, Pagination } from 'react-bootstrap';

const ProjectsList = () => {
    const { projects, deleteProject } = useContext(ProjectContext);
    const [confirmingDelete, setConfirmingDelete] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Calculate total pages and current page records
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const currentProjects = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
    };

    const handleEdit = (projNo) => {
        window.location.href = `/projects/edit/${projNo}`;
    };

    // Handle delete confirmation
    const handleDelete = async (projNo) => {
        setConfirmingDelete(projNo);
        toast.info(
            <div>
                <p>Are you sure you want to delete this employee?</p>
                <div>
                    <Button variant="danger" onClick={() => confirmDelete(projNo)}>Yes</Button>{' '}
                    <Button variant="secondary" onClick={() => setConfirmingDelete(null)}>No</Button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                hideProgressBar: true,
                draggable: false,
            }
        );
    };
console.log(handleDelete);
    const confirmDelete = async (projNo) => {
        try {
            await deleteProject(projNo); 
            toast.dismiss();
            toast.success("Project deleted successfully!");
            setConfirmingDelete(null); 
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project.");
        }
    };

    return (
        <div>
            <h2>Projects</h2>
            <Button variant="primary" href="/projects/new">Add New Project</Button>
            
            {/* Dropdown for items per page */}
            <Dropdown className="mb-3 mt-2">
                <Dropdown.Toggle variant="secondary">
                    Items per page: {itemsPerPage}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {[5, 10, 15, 20].map((count) => (
                        <Dropdown.Item key={count} onClick={() => handleItemsPerPageChange(count)}>
                            {count}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <ProjectTable projects={currentProjects} onEdit={handleEdit} onDelete={handleDelete} />
            
            {/* Pagination controls */}
            <Pagination className="justify-content-center mt-3">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>

            <ToastContainer />
        </div>
    );
};

export default ProjectsList;