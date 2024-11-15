import React, { useState, useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import { DepartmentContext } from '../../context/DepartmentContext';
import { Form, Button, Alert } from 'react-bootstrap';

const ProjectForm = ({ onSubmit, initialData = {} }) => {
    const { departments } = useContext(DepartmentContext);
    console.log(departments); // Check if departments are loaded
    const [formData, setFormData] = useState({
        projname: initialData.projname || '',
        deptno: initialData.deptno || '',
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
            {showAlert && <Alert variant="success">Project saved successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="projname">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="projname"
                        value={formData.projname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="deptno">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        name="deptno"
                        value={formData.deptno}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept.deptno} value={dept.deptno}>
                                {dept.deptname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default ProjectForm;
