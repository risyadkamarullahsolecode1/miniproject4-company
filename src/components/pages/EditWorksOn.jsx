import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorksOnContext } from '../../context/WorksOnContext';
import WorksOnForm from '../organisms/WorksOnForm';

const EditWorksOn = () => {
    const { empNo, projNo } = useParams();
    const { workRecords, editWorksOn } = useContext(WorksOnContext);
    const navigate = useNavigate();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        console.log('Route Parameters:', { empNo, projNo });
        console.log('Work Records in Context:', workRecords);

        if (workRecords) {
            const foundRecord = workRecords.find(
                (record) => record.empno === parseInt(empNo) && record.projno === parseInt(projNo)
            );
            if (foundRecord) {
                setInitialData(foundRecord);
            } else {
                console.error("Work record not found.");
            }
        }
    }, [workRecords, empNo, projNo]);

    const handleSubmit = (updatedRecord) => {
        editWorksOn(updatedRecord);
        navigate('/worksOns');  // Redirect back to list after editing
    };
    
    return (
        <div>
            <h2>Edit Work Record</h2>
            {initialData ? (
                <WorksOnForm onSubmit={handleSubmit} initialData={initialData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditWorksOn;
