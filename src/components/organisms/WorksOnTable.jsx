import React from 'react';
import { Table } from 'react-bootstrap';
import WorksOnTableList from '../molecules/WorksOnTableList';  // Assuming WorksOnTableList is another component

const WorksOnTable = ({ workRecords, onEdit, onDelete }) => {
    if (!workRecords || workRecords.length === 0) {
        return <p>No work records available.</p>;
    }

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Employee No</th>
                    <th>Project No</th>
                    <th>Date Worked</th>
                    <th>Hours Worked</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {workRecords.map((workRecord) => (
                    <WorksOnTableList
                        key={`${workRecord.empNo}-${workRecord.projNo}`}
                        worksOn={workRecord}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </Table>
    );
};

export default WorksOnTable;
