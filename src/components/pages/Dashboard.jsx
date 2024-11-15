import React, {useContext} from 'react';
import DashboardTemplate from '../templates/DashboardTemplate';
import { EmployeeContext } from '../../context/EmployeeContext';
import { DepartmentContext } from '../../context/DepartmentContext';
import { ProjectContext } from '../../context/ProjectContext';
import { WorksOnContext } from '../../context/WorksOnContext';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
    const { employees } = useContext(EmployeeContext);
    const { departments } = useContext(DepartmentContext);
    const { projects } = useContext(ProjectContext);
    const { worksOn } = useContext(WorksOnContext);

    return (
        <DashboardTemplate>
            <p>Welcome to the Company Management System. Use the navigation links to manage employees and departments.</p>
            <Row className="mt-4">
                <Col md={3}>
                    <Card bg="primary" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Employees</Card.Title>
                            <Card.Text>{employees.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="success" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Departments</Card.Title>
                            <Card.Text>{departments.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="info" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Projects</Card.Title>
                            <Card.Text>{projects.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="warning" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Works On</Card.Title>
                            <Card.Text>{worksOn.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </DashboardTemplate>
    );
};

export default Dashboard;