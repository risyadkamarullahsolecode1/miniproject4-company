import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../apiConfig';
import { Table, Alert } from 'react-bootstrap';

const WorksOnDetails = () => {
    const { projNo } = useParams();
    const [workHistory, setWorkHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkHistory = async () => {
            try {
                // Fetch employee work details by project number
                const response = await api.get(`/Employee/${projNo}/projects`);
                setWorkHistory(response.data);
            } catch (err) {
                setError("Failed to fetch work history.");
            }
        };

        fetchWorkHistory();
    }, [projNo]);

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Work History for Project {projNo}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee No</th>
                        <th>Employee Name</th>
                        <th>Project No</th>
                        <th>Project Name</th>
                        <th>Total Hours</th>
                        <th>Date Worked</th>
                    </tr>
                </thead>
                <tbody>
                    {workHistory.map((record, index) => (
                        <tr key={index}>
                            <td>{record.employeeNo}</td>
                            <td>{record.employeeName}</td>
                            <td>{record.projectNo}</td>
                            <td>{record.projectName}</td>
                            <td>{record.totalHours}</td>
                            <td>{new Date(record.dateWorked).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default WorksOnDetails;
