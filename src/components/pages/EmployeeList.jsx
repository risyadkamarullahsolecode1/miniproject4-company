import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import EmployeeTable from '../organisms/EmployeeTable';
import Button from '../atoms/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown, Pagination } from 'react-bootstrap';

const EmployeesList = () => {
    const { employees, deleteEmployee } = useContext(EmployeeContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [confirmingDelete, setConfirmingDelete] = useState(null);

    // Calculate total pages and current page records
    const totalPages = Math.ceil(employees.length / itemsPerPage);
    const currentEmployees = employees.slice(
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

    const handleEdit = (empNo) => {
        window.location.href = `/employees/edit/${empNo}`;
    };

    const handleDelete = (empNo) => {
        setConfirmingDelete(empNo);
        toast.info(
            <div>
                <p>Are you sure you want to delete this employee?</p>
                <div>
                    <Button variant="danger" onClick={() => confirmDelete(empNo)}>Yes</Button>{' '}
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

    const confirmDelete = async (empNo) => {
        try {
            await deleteEmployee(empNo);
            toast.dismiss();
            toast.success("Employee deleted successfully!");
            setConfirmingDelete(null);
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Failed to delete employee.");
        }
    };

    return (
        <div>
            <h2>Employees</h2>
            <Button variant="primary" href="/employees/new">Add New Employee</Button>

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

            <EmployeeTable employees={currentEmployees} onEdit={handleEdit} onDelete={handleDelete} />

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

export default EmployeesList;
