import React, { createContext, useEffect, useState } from 'react';
import { getWorksOn, addWorksOn, updateWorksOn, deleteWorksOn } from '../apiConfig';

export const WorksOnContext = createContext();

export const WorksOnProvider = ({ children }) => {
    const [worksOn, setWorksOn] = useState([]);

    useEffect(() => {
        fetchWorksOn();
    }, []); 

    const fetchWorksOn = async () => {
        try {
            const response = await getWorksOn();
            console.log("Fetched WorksOn data:", response.data); // Log the data
            setWorksOn(response.data);
        } catch (error) {
            console.error("Error fetching works-on assignments", error);
        }
    };
    const addWorksOnHandler = async (worksOnData) => {
        try {
            const response = await addWorksOn(worksOnData);
            setWorksOn([...worksOn, response.data]);
        } catch (error) {
            console.error("Error adding works-on assignment", error);
        }
    };

    const editWorksOnHandler = async (empNo, projNo, updatedData) => {
        try {
            await updateWorksOn(empNo, projNo, updatedData);
            setWorksOn(
                worksOn.map((wo) =>
                    wo.projNo === projNo && wo.empNo === empNo ? { ...wo, ...updatedData } : wo
                )
            );
        } catch (error) {
            console.error("Error updating works-on assignment", error);
        }
    };

    const deleteWorksOnHandler = async (empNo, projNo) => {
        try {
            await deleteWorksOn(empNo, projNo);
            setWorksOn(worksOn.filter((wo) => !(wo.empNo ===  empNo && wo.projNo === projNo)));
        } catch (error) {
            console.error("Error deleting works-on assignment", error);
        }
    };

    return (
        <WorksOnContext.Provider
            value={{
                worksOn,
                addWorksOn: addWorksOnHandler,
                editWorksOn: editWorksOnHandler,
                deleteWorksOn: deleteWorksOnHandler,
            }}
        >
            {children}
        </WorksOnContext.Provider>
    );
};
