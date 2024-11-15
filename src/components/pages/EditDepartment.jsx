import React, { useContext } from 'react';
import { DepartmentContext } from '../../context/DepartmentContext';
import DepartmentForm from '../organisms/DepartmentForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditDepartment = () => {
    const { departments, editDepartment } = useContext(DepartmentContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const department = departments.find((dept) => dept.deptno === parseInt(id));

    const handleSubmit = (updatedData) => {
        // Combine existing department data with updates, including deptNo
        const updatedDepartment = { ...department, ...updatedData };
        editDepartment(updatedDepartment); // Pass the complete updated data
        navigate('/departments');
    };

    return (
        <div>
            <h2>Edit Department</h2>
            {department ? (
                <DepartmentForm onSubmit={handleSubmit} initialData={department} />
            ) : (
                <p>Department not found</p>
            )}
        </div>
    );
};

export default EditDepartment;
