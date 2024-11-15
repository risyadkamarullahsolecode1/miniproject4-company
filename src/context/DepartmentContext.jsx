import React, { createContext, useEffect, useState } from 'react';
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from '../apiConfig';

export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await getDepartments();
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments", error);
            setError("Failed to load departments.");
        }
    };

    const addDepartmentHandler = async (departmentData) => {
        try {
            // Ensure mgrempno is either a valid number or null
            const dataToSend = {
                ...departmentData,
                mgrempno: departmentData.mgrempno ? parseInt(departmentData.mgrempno) : null
            };
    
            const response = await addDepartment(dataToSend);
            setDepartments([...departments, response.data]);
        } catch (error) {
            console.error("Error adding department", error);
        }
    };

    const editDepartmentHandler = async (updatedDepartment) => {
        try {
            const response = await updateDepartment(updatedDepartment.deptno, updatedDepartment);
            setDepartments((prevDepartments) =>
                prevDepartments.map((dept) =>
                    dept.deptNo === updatedDepartment.deptno ? response.data : dept
                )
            );
        } catch (error) {
            console.error("Error updating department", error);
        }
    };

    const deleteDepartmentHandler = async (deptNo) => {
        try {
            const response = await deleteDepartment(deptNo); 
            setDepartments(departments.filter((dept) => dept.deptno !== deptNo)); 
        } catch (error) {
            console.error("Error deleting department", error);
        }
    };

    return (
        <DepartmentContext.Provider
            value={{
                departments,
                addDepartment: addDepartmentHandler,
                editDepartment: editDepartmentHandler,
                deleteDepartment: deleteDepartmentHandler,
            }}
        >
            {children}
        </DepartmentContext.Provider>
    );
};
