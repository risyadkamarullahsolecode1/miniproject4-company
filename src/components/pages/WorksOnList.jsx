import React, { useContext, useState } from 'react';
import { WorksOnContext } from '../../context/WorksOnContext';
import WorksOnTable from '../organisms/WorksOnTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../atoms/Button';
import { Dropdown, Pagination } from 'react-bootstrap';

const WorksOnList = () => {
    const { worksOn, deleteWorksOn } = useContext(WorksOnContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    // Calculate total pages and current page records
    const totalPages = Math.ceil(worksOn.length / itemsPerPage);
    const currentWorksOn = worksOn.slice(
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
  
    const handleEdit = (workRecord) => {
        window.location.href = `/workson/edit/${workRecord.empNo}/${workRecord.projNo}`;
    };

    const handleDelete = (projNo) => {
        const confirmDelete = () => {
            deleteWorksOn(projNo);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        };

        toast.info(
            <div>
                <p>Are you sure you want to delete this record?</p>
                <div>
                    <Button variant="danger" onClick={confirmDelete}>Yes</Button>{' '}
                    <Button variant="secondary" onClick={toast.dismiss}>No</Button>
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

    return (
        <div>
            <h2>Works On Records</h2>
            <Button variant="primary" href="/worksOns/new">Add New Work Record</Button>
            
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

            <WorksOnTable workRecords={currentWorksOn} onEdit={handleEdit} onDelete={handleDelete} />
            
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

export default WorksOnList;
