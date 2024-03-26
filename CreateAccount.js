import logo from './dbArt.png';
import './CreateAccount.css';
import React, { useState } from 'react';


function Login() {
    /*
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });*/
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('this should change');
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
          const response = await fetch("/testing", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            //mode: "cors",
            body: JSON.stringify({"username":username, "password":password})
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
      <div>
        <div className="Create">
            <header className="Create-header">
                <img src={logo} className="Create-logo" alt="logo"/>
                <h1>Create a new Account</h1>
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
                <label htmlFor="password">Password:</label>
                <input
                    value={password}
                    name="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button OnClick={onClick}>Submit</button>
            </body>
        </div>
      </div>
    );
  }

  
export default Login;