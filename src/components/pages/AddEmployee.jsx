import React, { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import EmployeeForm from '../organisms/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddEmployee = () => {
    const { addEmployee } = useContext(EmployeeContext);
    const navigate = useNavigate();

    const handleSubmit = async (employeeData) => {
        try {
            // Attempt to add the employee
            await addEmployee(employeeData);
            // If successful, navigate back to the employees list
            
        } catch (error) {
            console.error("Error adding employee:", error);
            // If there's an error, show a toast and prevent navigation
            toast.error(error.response?.data?.message || "Failed to add employee");
        }
    };

    return (
        <div>
            <h2>Create New Employee</h2>
            <EmployeeForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddEmployee;