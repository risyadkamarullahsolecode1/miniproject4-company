import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../apiConfig';
import { Alert, Card } from 'react-bootstrap';

const EmployeeDetails = () => {
    const { empNo } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const empResponse = await api.get(`/Employee/${empNo}`);
                setEmployee(empResponse.data);
            } catch (err) {
                setError("Failed to fetch employee details.");
            }
        };
        fetchEmployeeDetails();
    }, [empNo]);

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!employee) return <p>Loading...</p>;

    return (
        <Card>
            <Card.Title className="text-center fw-bolder">Employee Details</Card.Title>
            <Card.Body><strong>Employee No:</strong> {employee.empno}</Card.Body>
            <Card.Body><strong>Name:</strong> {employee.fname} {employee.lname}</Card.Body>
            <Card.Body><strong>Sex:</strong> {employee.sex}</Card.Body>
            <Card.Body><strong>Position:</strong> {employee.position}</Card.Body>
            <Card.Body><strong>Sex:</strong> {employee.dob}</Card.Body>
            <Card.Body><strong>Address:</strong> {employee.address}</Card.Body>
            <Card.Body><strong>Department No:</strong> {employee.deptno}</Card.Body>
        </Card>
    );
};

export default EmployeeDetails;
