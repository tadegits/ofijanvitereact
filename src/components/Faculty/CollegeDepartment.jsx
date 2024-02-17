import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { fetchCollegesWithDepartment } from './../../Globals/incomingData';
const { Panel } = Collapse;
const CollegeDepartment = ({ onSelectDepartment }) => {
    const [collegesWithDepartment, setCollegeWithDepartment] = useState([]); 
    useEffect(() => {
      const getCollegeWithDepartment = async () => {
        const fetchedColleges = await fetchCollegesWithDepartment();
        setCollegeWithDepartment(fetchedColleges);
      };
      getCollegeWithDepartment();
    }, []);
    
    const handleDepartmentClick = (department) => {
        onSelectDepartment(department);
    };
    return (
      <Collapse accordion>
        {collegesWithDepartment.map((college, index) => (
          <Panel header={college.college_name} key={index}>
            <ul>
              {college.departments.map((department, subIndex) => (
                <li key={subIndex} onClick={() => handleDepartmentClick(department.id)}>
                    {department.name}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    );
};
export default CollegeDepartment;
