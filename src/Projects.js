import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { TextField } from '@mui/material';

const Hwset = ({number, handleCheckInOut, quantity}) => {
    return (
        <div>
            <p>HWSet{number} {quantity}/100</p>
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


const Project = ({ project, handleJoinLeave, handleCheckInOut }) => {
    return (
                <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <div>
                        <h3>{project.name} </h3>
                        <Button variation="contained" onClick={() => handleJoinLeave(project.id)}>
                            {project.joined ? 'Leave' : 'Join'}
                        </Button>
                    </div>
                    <Hwset number={1} 
                            handleJoinLeave={handleJoinLeave}
                            handleCheckInOut={handleCheckInOut}
                            quantity={0} >
                    </Hwset>
                    <Hwset number={2} 
                            handleJoinLeave={handleJoinLeave}
                            handleCheckInOut={handleCheckInOut}
                            quantity={50} >
                    </Hwset>
                </div>
            );
};


const Projects = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', joined: false },
    { id: 2, name: 'Project 2', joined: false },
    { id: 3, name: 'Project 3', joined: false }
  ]);
  const [capacity, setCapacity] = useState(100);

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
      <h1>Projects</h1>
      {projects.map(project => (
        <Project
          key={project.id}
          project={project}
          handleJoinLeave={handleJoinLeave}
          handleCheckInOut={handleCheckInOut}
        />
      ))}
    </div>
  );
};


export default Projects;