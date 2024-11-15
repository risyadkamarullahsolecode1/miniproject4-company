import React, { useState, useContext } from 'react';
import FormField from '../molecules/FormField';
import CustomButton from '../atoms/Button';
import { Alert, Form } from 'react-bootstrap';
import { DepartmentContext } from '../../context/DepartmentContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = ({ onSubmit, initialData = {} }) => {
    const { departments } = useContext(DepartmentContext);
    const [formData, setFormData] = useState({
        fname: initialData.fname || '',
        lname: initialData.lname || '',
        address: initialData.address || '',
        dob: initialData.dob || '',
        sex: initialData.sex || '',
        position: initialData.position || '',
        deptno: initialData.deptno || '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const errors = {};
        if (!formData.fname) errors.fname = 'First name is required';
        if (!formData.lname) errors.lname = 'Last name is required';
        if (!formData.address.trim()) errors.address = 'Address is required';
        if (!formData.dob) errors.dob = 'Date of Birth is required';
        if (!formData.sex) errors.sex = 'Sex is required';
        if (!formData.position.trim()) errors.position = 'Position is required';
        if (!formData.deptno) errors.deptno = 'Department is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                // Pass the form data to the parent onSubmit handler
                await onSubmit(formData);
                toast.success('Employee added successfully!');
            } catch (err) {
                // Handle backend validation error
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.message); // Show specific backend error message
                    toast.error(err.response.data.message); // Optional: Toast notification for error
                } else {
                    setErrorMessage('An unexpected error occurred.');
                    toast.error('An unexpected error occurred.');
                }
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <ToastContainer />
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <form onSubmit={handleSubmit}>
                <FormField
                    label="First Name"
                    id="fname"
                    value={formData.fname}
                    name="fname"
                    onChange={handleChange}
                    error={errors.fname}
                />
                <FormField
                    label="Last Name"
                    id="lname"
                    value={formData.lname}
                    name="lname"
                    onChange={handleChange}
                    error={errors.lname}
                />
                <FormField
                    label="Address"
                    id="address"
                    value={formData.address}
                    name="address"
                    onChange={handleChange}
                    error={errors.address}
                />
                <FormField
                    label="Date of Birth"
                    id="dob"
                    type="date"
                    value={formData.dob}
                    name="dob"
                    onChange={handleChange}
                    error={errors.dob}
                />
                <div>
                    <Form.Label>Sex</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            id="male"
                            name="sex"
                            value="Male"
                            label="Male"
                            checked={formData.sex === 'Male'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="female"
                            name="sex"
                            value="Female"
                            label="Female"
                            checked={formData.sex === 'Female'}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.sex && <div className="text-danger">{errors.sex}</div>}
                </div>
                <FormField
                    label="Position"
                    id="position"
                    value={formData.position}
                    name="position"
                    onChange={handleChange}
                    error={errors.position}
                />
                <Form.Group controlId="deptno">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        name="deptno"
                        value={formData.deptno}
                        onChange={handleChange}
                        disabled={departments.length === 0} // Disable if no departments
                    >
                        <option value="">Select a Department</option>
                        {departments.length === 0 ? (
                            <option disabled>No departments available</option>
                        ) : (
                            departments.map((dept) => (
                                <option key={dept.deptno} value={dept.deptno}>
                                    {dept.deptname}
                                </option>
                            ))
                        )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.deptno}
                    </Form.Control.Feedback>
                </Form.Group>
                <CustomButton type="submit">Submit</CustomButton>
            </form>
        </div>
    );
};

export default EmployeeForm;
