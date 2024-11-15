import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import EmployeeForm from '../organisms/EmployeeForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { employees, editEmployee } = useContext(EmployeeContext);
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);
    const employee = employees.find((emp) => emp.empno === parseInt(id));

    console.log(employee);
    const handleSubmit = (updatedData) => {
        const updatedEmployee = { ...employee, ...updatedData };
        editEmployee(updatedEmployee); // Pass the complete updated data
        navigate('/employees');
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            {employee ? (
                <EmployeeForm onSubmit={handleSubmit} initialData={employee} />
            ) : (
                <p>Employee Not Found</p>
            )}
        </div>
    );
};

export default EditEmployee;
