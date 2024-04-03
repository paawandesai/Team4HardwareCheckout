import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { TextField } from '@mui/material';

const Hwset = ({number, handleCheckInOut, quantity}) => {
    return (
        <div>
            <p>{number} {quantity}/100</p>
            <TextField id="outlined-number" type="number" label="Quantity" variant="outlined" />
            <Button variation="contained" onClick={() => handleCheckInOut('checkIn', number)}>
            Check In
            </Button>
            <Button variation="contained" onClick={() => handleCheckInOut('checkOut', number)}>
            Check Out
            </Button>
        </div>
    )
}


const Project = ({ project, handleJoinLeave }) => {
  const [hwsets, setHwsets] = useState([]);

  const handleCheckInOut = async (action, number) => {
    //I could handle the change to qty here
    if (action == 'checkOut') {
      try {
        const response = await fetch(`/checkout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ number })
        });
        if (!response.ok) throw new Error(`Status Code: ${response.status}`);
        let data = await response.json();
        console.log(data);
        alert('Hardware checked out');
      } catch (error) {
        console.error('Error:', error);
        alert(`Failed to check out hardware: ${error.message}`);
      }
    } else if (action == 'checkIn') {
      try {
        const response = await fetch(`/checkin/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ number })
        });
        if (!response.ok) throw new Error(`Status Code: ${response.status}`);
        let data = await response.json();
        console.log(data);
        alert('Hardware checked out');
      } catch (error) {
        console.error('Error:', error);
        alert(`Failed to check out hardware: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    // Fetch the data from the database and update the state
    fetch('/hardwareSets/')
      .then(response => response.json())
      .then(data => setHwsets(data));
  }, [handleCheckInOut]);

    return (
      <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <div>
          <h3>{project.name} </h3>
          <Button variation="contained" onClick={() => handleJoinLeave(project.id)}>
            {project.joined ? 'Leave' : 'Join'}
          </Button>
        </div>
        {hwsets.map(hwset => (
          <Hwset 
            number={hwset.number} 
            handleJoinLeave={handleJoinLeave}
            handleCheckInOut={handleCheckInOut}
            quantity={hwset.quantity} 
          />
        ))}
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



  return (
    <div>
      <h1>Projects</h1>
      {projects.map(project => (
        <Project
          key={project.id}
          project={project}
          handleJoinLeave={handleJoinLeave}
        />
      ))}
      
    </div>
  );
};


export default Projects;