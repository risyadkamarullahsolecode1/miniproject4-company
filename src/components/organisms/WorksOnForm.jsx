import React, { useState, useContext } from 'react';
import { WorksOnContext } from '../../context/WorksOnContext';
import { ProjectContext } from '../../context/ProjectContext';
import { EmployeeContext } from '../../context/EmployeeContext';
import { Form, Button, Alert } from 'react-bootstrap';

const WorksOnForm = ({ onSubmit, initialData = {} }) => {
    const { projects } = useContext(ProjectContext);
    const { employees } = useContext(EmployeeContext);
    console.log(employees); // Check if departments are loaded
    console.log(projects); // Check if departments are loaded
    const [formData, setFormData] = useState({
        projno: initialData.projno || '',
        empno: initialData.empno || '',
        dateworked: initialData.dateworked || '',
        hoursworked: initialData.hoursworked || '',
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div>
            {showAlert && <Alert variant="success">Assignment saved successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="projno">
                    <Form.Label>Project</Form.Label>
                    <Form.Select
                        name="projno"
                        value={formData.projno}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Project</option>
                        {projects.map(proj => (
                            <option key={proj.projno} value={proj.projno}>
                                {proj.projname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="empno">
                    <Form.Label>Employee</Form.Label>
                    <Form.Select
                        name="empno"
                        value={formData.empno}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                            <option key={emp.empno} value={emp.empno}>
                                {emp.nname} {emp.lname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="dateworked">
                    <Form.Label>Date Worked</Form.Label>
                    <Form.Control
                        type="date"
                        name="dateworked"
                        value={formData.dateworked}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="hoursworked">
                    <Form.Label>Hours Worked</Form.Label>
                    <Form.Control
                        type="number"
                        name="hoursworked"
                        value={formData.hoursworked}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default WorksOnForm;
