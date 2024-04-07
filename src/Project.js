import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Hwset = ({project, number, handleCheckIn, handleCheckOut, capacity, availability}) => {
  const [qtyform, setQtyform] = useState(0);


  const handleChange = (e) => {
    setQtyform(e.target.value);
  };

    return (
        <div>
            <p>HWSet{number} </p>
            <p>Capacity:{capacity}   Availability:{availability}/{capacity}</p>
            <TextField id="outlined-number" type="number" value={qtyform} onChange={handleChange} label="Quantity" variant="outlined" />
            <Button variation="contained" onClick={(e) => handleCheckIn(project.id,qtyform,number,e)}>
            Check In
            </Button>
            <Button variation="contained" onClick={(e) => handleCheckOut(project.id,qtyform,number,e)}>
            Check Out
            </Button>
        </div>
    )
}


const Project = ({ project, handleCheckIn, handleCheckOut, Availability_1, Availability_2, capacity_1, capacity_2 }) => {
    return (
                <div key={project.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <div>
                    <Hwset number={1} 
                            project={project}

                            handleCheckIn={handleCheckIn}
                            handleCheckOut={handleCheckOut}
                            capacity={capacity_1}
                            availability={Availability_1} >
                    </Hwset>
                    </div>
                    <div style={{marginTop: '10px'}}>
                    <Hwset number={2} 
                            project={project}
                            handleCheckIn={handleCheckIn}
                            handleCheckOut={handleCheckOut}
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
  const navigate = useNavigate();


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
  /*
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
  */
  const handleCheckIn = async(projectID,qty,number) => {
    try {
      const response = await fetch("/checkIn/", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        //mode: "cors",
        body: JSON.stringify({"projectID":projectID, "qty":qty,"number":number})
      });
      
      const data = await response.json();
      if (data.checkedin===false){
        alert("Failed to checkin hardware because you have not checked out that much hardware")
      }
      else{
        alert(data.qty+" hardware checked in to project "+data.projectID)
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
      }
      
      //setMessage(data.qty)
    } catch (error) {
      console.error('Error:', error);
      //setMessage("error")
    }
  };

  const handleCheckOut = async(projectID,qty,number) => {
    
    try {
      const response = await fetch("/checkOut/", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        //mode: "cors",
        body: JSON.stringify({"projectID":projectID, "qty":qty, "number":number})
      });
      
      const data = await response.json();
      if (data.checkedout===false){
        alert("Failed to checkout hardware because there is not enough available")
      }
      else{
        alert(data.qty+" hardware checked out to project "+data.projectID)
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
      }
      //setMessage(data.qty)
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
    } catch (error) {
      console.error('Error:', error);
      //setMessage("error")
    }
  };
  const handleLogOff = async() => {
    
    navigate("/")
  };
  return (
    <div>
      <h1>Project {projectID}</h1>
      {projects.map(project => (
        <Project
          key={project.id}
          project={project}
          handleCheckIn={handleCheckIn}
          handleCheckOut={handleCheckOut}
          Availability_1={Availability_1}
          Availability_2={Availability_2}
          capacity_1={capacity_1}
          capacity_2={capacity_2}
        />
      ))}
      <Button variation="contained" onClick={(e) => handleLogOff()}>
            Log Out
      </Button>
    </div>
  );
};


export default Projects_main;