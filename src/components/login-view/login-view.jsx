// GLOBAL
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

// VIEW
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate Inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr(
        'Username must be at least 5 characters!'
      );
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required!');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr(
        'Password must be at least 5 characters long!'
      );
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      /*Server Authentication*/

      axios
        .post('https://faraflix.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          // Server Response + Token🪙
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.error('User Does Not Exist');
          alert('Incorrect Username/Password');
        });
    }
  };

  return (
    <Form>
      
      {/* Username */}
      <Form.Group as={Row}>
        <Form.Label column sm="12" htmlFor="username">
          Username:
        </Form.Label>
        <Col sm="10" md={6}>
          <Form.Control
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameErr && <p>{usernameErr}</p>}
        </Col>
      </Form.Group>
      
      {/* Password */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="12" htmlFor="password">
          Password:
        </Form.Label>{' '}
        <Col sm="10" md={6}>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr && <p>{passwordErr}</p>}
        </Col>
      </Form.Group>
      
      {/* Submit Button */}
      <Button
        className="mr-3"
        type="submit"
        onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
