import React, { useContext } from 'react';
import { DepartmentContext } from '../../context/DepartmentContext';
import DepartmentForm from '../organisms/DepartmentForm';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const { addDepartment } = useContext(DepartmentContext);
    const navigate = useNavigate();

    const handleSubmit = (departmentData) => {
        addDepartment(departmentData);
        navigate('/departments');
    };

    return (
        <div>
            <h2>Create New Department</h2>
            <DepartmentForm onSubmit={handleSubmit} />
        </div>
    );
}

export default AddDepartment;