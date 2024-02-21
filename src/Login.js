import logo from './dbArt.png';
import './Login.css';

function Login() {
    return (
        <div className="Login">
            <header className="Login-header">
                <img src={logo} className="Login-logo" alt="logo"/>
                <h1>Login Page</h1>
            </header>
            <body className='Login-body'>
                <p id='username'>
                    <label for="username">Username</label>
                    <input type="text" name="username"></input>
                </p>
                <p id='password'>
                    <label for="password">Password</label>
                    <input type="text" name="password"></input>
                </p>
                <p id='userid'>
                    <label for="userid">UserID</label>
                    <input type="text" name='userid'></input>
                </p>
                <button id='button'>Confirm</button>
            </body>
        </div>
    );
}

export default Login;