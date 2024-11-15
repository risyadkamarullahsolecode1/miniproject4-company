import React from 'react';
import EmployeeTableList from '../molecules/EmployeeTableList';
import { Table } from 'react-bootstrap';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Employee No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Position</th>
                    <th>Department No</th>
                    <th>Sex</th>
                    <th>Address</th>
                    <th>Date of Birth</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <EmployeeTableList key={employee.empno} employee={employee} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </Table>
    );
};

export default EmployeeTable;