import logo from './dbArt.png';
import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function Login() {

    const navigate = useNavigate();


    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState('')

    const handleRegister = async() => {
      navigate("/create-account/")
    };
    const onClick = async(e) => {
        //setMessage("Was Clicked");
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
            navigate("/projectMgmt/")
          } else {
            setMessage('Invalid username or password.');
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred.');
        }
      
    
    }


    return (
      <form onSubmit={onClick}>
        <div className="Login">
            <header className="Login-header">
                <img src={logo} className="Login-logo" alt="logo"/>
                <h1>Login Page</h1>
            </header>
            <body className='Login-body'>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    value={username}
                    name="username"
                    id="username"
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="userID">UserID:</label>
                <input
                    value={userID}
                    name="userID"
                    id="userID"
                    onChange={e => setUserID(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                 
                    value={password}
                    name="password"
                    type="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
            </body>
        <div>
        <Button variation="contained" onClick={(e) => handleRegister()}>
            New User? Register Here
        </Button>
        </div>
        </div>
        <p>{message}</p>
        </form>
    );
  }

  
export default Login;
