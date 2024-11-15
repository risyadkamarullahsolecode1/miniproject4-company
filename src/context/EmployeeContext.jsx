import React, { createContext, useEffect, useState } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../apiConfig'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees", error);
            toast.error(error.response?.data?.message || "Error fetching employees");
        }
    };

    const addEmployeeHandler = async (employeeData) => {
        try {
            const response = await addEmployee(employeeData);
            setEmployees([...employees, response.data]);
        } catch (error) {
            console.error("Error adding employee", error);
            toast.error(error.response?.data?.message || "Error adding employee");
        }
    };

    const editEmployeeHandler = async (updatedEmployee) => {
        try {
            await updateEmployee(updatedEmployee.empNo, updatedEmployee);
            setEmployees(
                employees.map((emp) => (emp.empNo === updatedEmployee.empNo ? updatedEmployee : emp))
            );
        } catch (error) {
            console.error("Error updating employee", error);
            toast.error(error.response?.data?.message || "Error updating employee");
        }
    };

    const deleteEmployeeHandler = async (empNo) => {
        try {
            await deleteEmployee(empNo);
            setEmployees(employees.filter((emp) => emp.empNo !== empNo));
        } catch (error) {
            console.error("Error deleting employee", error);
            toast.error(error.response?.data?.message || "Error deleting employee");
        }
    };

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                addEmployee: addEmployeeHandler,
                editEmployee: editEmployeeHandler,
                deleteEmployee: deleteEmployeeHandler,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
};
