import React, { useContext, useState } from 'react';
import { DepartmentContext } from '../../context/DepartmentContext';
import DepartmentTable from '../organisms/DepartmentTable';
import CustomButton from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dropdown, Pagination } from 'react-bootstrap';

const DepartmentList = () => {
    const { departments, deleteDepartment } = useContext(DepartmentContext);
    const [confirmingDelete, setConfirmingDelete] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const totalPages = Math.ceil(departments.length / itemsPerPage);
    const currentDepartments = departments.slice(
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

    const handleEdit = (deptNo) => {
        window.location.href = `/departments/edit/${deptNo}`;
    };

    // Handle delete confirmation
    const handleDelete = async (deptNo) => {
        setConfirmingDelete(deptNo); 
        toast.info(
            <div>
                <p>Are you sure you want to delete this department?</p>
                <div>
                    <Button variant="danger" onClick={() => confirmDelete(deptNo)}>Yes</Button>{' '}
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

    const confirmDelete = async (deptNo) => {
        try {
            await deleteDepartment(deptNo); 
            toast.dismiss(); 
            toast.success("Department deleted successfully!");
            setConfirmingDelete(null); 
        } catch (error) {
            console.error("Error deleting department:", error);
            toast.error("Failed to delete department.");
        }
    };

    return (
        <div>
            <h2>Departments</h2>
            <CustomButton variant="primary" href="/departments/new">Add New Department</CustomButton>
            
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
            
            <DepartmentTable departments={currentDepartments} onEdit={handleEdit} onDelete={handleDelete}/>
            
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

export default DepartmentList;