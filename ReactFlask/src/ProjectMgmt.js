import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { TextField } from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProjectMgmt = () => {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [projectID, setProjectID] = useState('');
    const [projectIDJoin, setProjectIDJoin] = useState('');
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');

    const navigate = useNavigate();
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
    const onClickCreate = async(e) => {
      //setMessage("Was Clicked");
      
      console.log("Button was clicked")
      
      e.preventDefault();
      

      try {
        const response = await fetch("/createProject/", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          //mode: "cors",
          body: JSON.stringify({"name":name, "description":description, "projectID":projectID})
        });
  
        const data = await response.json();
        if (data.created===true) {
          navigate(`/project/${projectID}`)
        } else {
          setMessage('Sorry, that ProjectID already exists');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred.');
      }
      
    }
    
    const onClickJoin = async(e) => {
      //first need to check if the ID actually exists
      e.preventDefault();

      try {
        const response = await fetch("/getProject/", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({"projectID":projectIDJoin})
        });
  
        const data = await response.json();
        if (data.exists===true) {
          navigate(`/project/${projectIDJoin}`)
        } else {
          setMessage2('Sorry, that ProjectID does not exist');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage2('An error occurred.');
      }
      
      //setMessage("Was Clicked");
      /*
      console.log("Button was clicked")
      
      e.preventDefault();
      
      

      try {
        const response = await fetch("/login/", {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          //mode: "cors",
          body: JSON.stringify({"username":username, "userID":userID, "password":password})
        });
  
        const data = await response.json();
        if (data.verified===true) {
          navigate("/projects/")
        } else {
          setMessage('Invalid username or password.');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred.');
      }
      */
      //navigate(`/project/${projectIDJoin}`) 
      
    }
    
  
  
  

    return (
      <div>
          <form onSubmit={onClickCreate}>
            <h1>Create New Project</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    value={name}
                    name="name"
                    id="name"
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    value={description}
                    name="description"
                    id="description"
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="projectID">ProjectID:</label>
                <input
                 
                    value={projectID}
                    name="projectID"
                    type="projectID"
                    id="projectID"
                    onChange={e => setProjectID(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create</button>
        </form>
        <p>{message}</p>
        <form onSubmit={onClickJoin}>
          <h1>Join Existing Project</h1>
          <div>
                <label htmlFor="projectIDJoin">ProjectID:</label>
                <input
                    value={projectIDJoin}
                    name="projectIDJoin"
                    type="projectIDJoin"
                    id="projectIDJoin"
                    onChange={e => setProjectIDJoin(e.target.value)}
                    required
                />
          </div>
          <button type="submit">Join</button>
        </form>
        <p>{message2}</p>
        
      </div>

    );
  };
  
  
  export default ProjectMgmt;