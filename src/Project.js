import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const Hwset = ({number, handleCheckInOut, capacity, availability}) => {
    return (
        <div>
            <p>HWSet{number} </p>
            <p>Capacity:{capacity}   Availability:{availability}/{capacity}</p>
            <TextField id="outlined-number" type="number" label="Quantity" variant="outlined" />
            <Button variation="contained" onClick={() => handleCheckInOut('checkIn')}>
            Check In
            </Button>
            <Button variation="contained" onClick={() => handleCheckInOut('checkOut')}>
            Check Out
            </Button>
        </div>
    )
}


const Project = ({ project, handleJoinLeave, handleCheckInOut, Availability_1, Availability_2, capacity_1, capacity_2 }) => {
    return (
                <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <div>
                    <Hwset number={1} 
                            handleJoinLeave={handleJoinLeave}
                            handleCheckInOut={handleCheckInOut}
                            capacity={capacity_1}
                            availability={Availability_1} >
                    </Hwset>
                    </div>
                    <div style={{marginTop: '10px'}}>
                    <Hwset number={2} 
                            handleJoinLeave={handleJoinLeave}
                            handleCheckInOut={handleCheckInOut}
                            capacity={capacity_2}
                            availability={Availability_2} >
                    </Hwset>
                    </div>
                </div>
            );
};


const Projects_main = () => {
    const { projectID } = useParams();
  const [projects, setProjects] = useState([
    { id: projectID, name: 'Project'+projectID, joined: false },
  ]);
  const [capacity_1, setCapacity_1] = useState([]);
  const [capacity_2, setCapacity_2] = useState([]);
  const [Availability_1, setAvailability1] = useState([]);
  const [Availability_2, setAvailability2] = useState([]);



  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/getData/", {
          method: "GET",
          headers: {"Content-Type" : "application/json"},
        });
  
        const data = await response.json();
        setCapacity_1(data.capacity_1);
        setCapacity_2(data.capacity_2);
        setAvailability1(data.Availability_1);
        setAvailability2(data.Availability_2);
      } catch (error) {
        console.error('Error:', error);
        setAvailability1('An error occurred.');
      }
    };
    getData();
  }, []);

  const handleJoinLeave = (id) => {
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.id === id) {
          return { ...project, joined: !project.joined };
        }
        return project;
      })
    );
  };

  const handleCheckInOut = (action) => {
    //I could handle the change to qty here
  };

  return (
    <div>
      <h1>Project {projectID}</h1>
      {projects.map(project => (
        <Project
          key={project.id}
          project={project}
          handleJoinLeave={handleJoinLeave}
          handleCheckInOut={handleCheckInOut}
          Availability_1={Availability_1}
          Availability_2={Availability_2}
          capacity_1={capacity_1}
          capacity_2={capacity_2}
        />
      ))}
    </div>
  );
};


export default Projects_main;