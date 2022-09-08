import React, {useState} from 'react';
import PropTypes from "prop-types";
export function LoginView(props){
    const [username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
      /* Send a request to the server for authentication */
      /* then call props.onLoggedIn(username) */
       props.onLoggedIn(username);
    };
  
    return (
      <form>
        <h1>Login Page</h1>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <br/>
        <br/>
        <button>Register</button>
      </form>
    );
  }
  LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };