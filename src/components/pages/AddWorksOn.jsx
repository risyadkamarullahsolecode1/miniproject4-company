// src/components/pages/AddWorksOn.jsx
import React, { useContext } from 'react';
import { WorksOnContext } from '../../context/WorksOnContext';
import WorksOnForm from '../organisms/WorksOnForm';
import { useNavigate } from 'react-router-dom';

const AddWorksOn = () => {
    const { addWorksOn } = useContext(WorksOnContext);
    const navigate = useNavigate();

    const handleSubmit = (workData) => {
        addWorksOn(workData);
        navigate('/worksOns');
    };

    return (
        <div>
            <h2>Create New Work Record</h2>
            <WorksOnForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddWorksOn;
