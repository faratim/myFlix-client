import React, {useState} from 'react';
import PropTypes from "prop-types";
export function Registration(props){
    const [username, setUsername] = useState('');
    const [ password, setPassword ] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
         props.Registration(username);
      };
        return(
            <form>
                <h1>Registration Page</h1>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Email-Id:
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <label>
                    Birthday:
                </label>
                <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        )
    }
    RegistrationView.propTypes = {
        onRegistration: PropTypes.func.isRequired,
      };