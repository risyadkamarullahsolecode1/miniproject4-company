import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const EmployeeTableList = ({ employee, onEdit, onDelete }) => {
    const navigate = useNavigate ();
    return (
        <tr>
            <td>{employee.empno}</td>
            <td>{employee.fname}</td>
            <td>{employee.lname}</td>
            <td>{employee.position}</td>
            <td>{employee.deptno}</td>
            <td>{employee.sex}</td>
            <td>{employee.address}</td>
            <td>{employee.dob}</td>
            <td>
                <Button variant="primary" onClick={() => navigate(`/employees/${employee.empno}`)}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Details
                </Button>{' '}
                <Button variant="warning" onClick={() => onEdit(employee.empno)}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => onDelete(employee.empno)}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                </Button>
            </td>
        </tr>
    );
};

export default EmployeeTableList;
