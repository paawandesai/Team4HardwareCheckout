import logo from './dbArt.png';
import './CreateAccount.css';
import React, { useState } from 'react';


function CreateAccount() {
    /*
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });*/
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userID, setUserID] = useState('');
    const [message, setMessage] = useState('');
  /*
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    */
    const onClick = async(e) => {
        //setMessage('Credentials verified!');
        console.log("Button was clicked")

        
        try {
          const response = await fetch("/create", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            //mode: "cors",
            body: JSON.stringify({"username":username, "password":password, "userID":userID})
          });
    
          const data = await response.json();
          if (data.verified) {
            setMessage('Credentials verified!');
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
        <div className="Create">
            <header className="Create-header">
                <img src={logo} className="Create-logo" alt="logo"/>
                <h1>Create New Account</h1>
            </header>
            <body className='Create-body'>
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
        </div>
      </form>
    );
  }

  
export default CreateAccount;