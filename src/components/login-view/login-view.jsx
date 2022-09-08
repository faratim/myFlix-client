import React from 'react';


/////////////////////////////////
//CLASS COMPONENT
// export class LoginView extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             username: '',
//             password: ''
//         };
//         this.onUsernameChange = this.onUsernameChange.bind(this);
//         this.onPasswordChange = this.onPasswordChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     onUsernameChange(event) {
//         this.setState({
//             username: event.target.value
//         });
//     }
//     onPasswordChange(event) {
//         this.setState({
//             password: event.target.value
//         });
//     }
//     handleSubmit() {
//         const { username, password } = this.state;
//         console.log(username, password);
//         /* Send a request to the server for authentication */
//     /* then call this.props.onLoggedIn(username) */
//     // this.props.onLoggedIn(username);
//     }

//     render() {
//         return (
//             <form>
//                 <label>
//                     Username:
//                     <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
//                 </label>
//                 <label>
//                     Password:
//                     <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
//                 </label>
//                 <button type="button" onClick={this.handleSubmit}>Submit</button>
//             </form>
//         );
//     }
// }


/////////////////////////////////
//FUNCTIONAL COMPONENT

import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
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
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}