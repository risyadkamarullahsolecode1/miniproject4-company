import React, { useState, useContext } from 'react';
import { DepartmentContext } from '../../context/DepartmentContext';
import { EmployeeContext } from '../../context/EmployeeContext';
import { Form, Button, Alert } from 'react-bootstrap';

const DepartmentForm = ({ onSubmit, initialData = {} }) => {
    const { employees } = useContext(EmployeeContext);
    const [formData, setFormData] = useState({
        deptname: initialData.deptname || '',
        mgrempno: initialData.mgrempno || '',
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
            {showAlert && <Alert variant="success">Department saved successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="deptname">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="deptname"
                        value={formData.deptname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="mgrempno">
                    <Form.Label>Manager (Employee)</Form.Label>
                    <Form.Select
                        name="mgrempno"
                        value={formData.mgrempno}
                        onChange={handleChange}
                    >
                        <option value="">Select Manager</option>
                        {employees.map(emp => (
                            <option key={emp.empno} value={emp.empno}>
                                {emp.fname} {emp.lname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default DepartmentForm;
