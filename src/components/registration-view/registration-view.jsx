// GLOBAL
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

// SCSS
import './registration-view.scss';

// VIEW
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthdate] = useState('');
  const [email, setEmail] = useState('');

  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    birthdayErr: '',
    emailErr: '',
  });

  // Validate User
  const validate = () => {
    let isReq = true;
    setValues((prevValue) => {
      return {
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
        birthdayErr: '',
      };
    });
    if (!username) {
      setValues((prevValue) => {
        return {
          ...prevValue,
          usernameErr: 'Username is Required',
        };
      });
      isReq = false;
    } else if (username.length < 5) {
      setValues((prevValue) => {
        return {
          ...prevValue,
          usernameErr:
            'Username must be at least 5 characters long!',
        };
      });
      isReq = false;
    }
    if (!password) {
      setValues((prevValue) => {
        return {
          ...prevValue,
          passwordErr: 'Password is required!',
        };
      });
      isReq = false;
    } else if (password.length < 5) {
      setValues((prevValue) => {
        return {
          ...prevValue,
          passwordErr:
            'Password must be at least 5 characters long!',
        };
      });
      isReq = false;
    }
    if (!email) {
      setValues((prevValue) => {
        return {
          ...prevValue,
          emailErr: 'Email is required!',
        };
      });
      isReq = false;
    } else if (email.indexOf('@') < 1) {
      setValues((prevValue) => {
        return {
          ...prevValue,
          emailErr: 'Please enter a valid email address!',
        };
      });
      isReq = false;
    }
    return isReq;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://faraflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          window.open('/', '_self');
        })
        .catch((response) => {
          console.error(response);
          alert('User already exists. Please login instead!');
        });
    }
  };

  return (
    <Form className="justify-content-center">
      
      {/* Username */}
      <Form.Group as={Row} className="reg-form-inputs">
        <Form.Label
          column="true"
          sm="12"
          htmlFor="username">
          Username*:
        </Form.Label>
        <Col sm="10" md="5">
          <Form.Control
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {values.usernameErr && (
            <p className="validation-message">
              {values.usernameErr}
            </p>
          )}
        </Col>
      </Form.Group>
      
      {/* Password */}
      <Form.Group as={Row} className="reg-form-inputs">
        <Form.Label
          column="true"
          sm="12"
          htmlFor="password">
          Password*:
        </Form.Label>
        <Col sm="10" md="5">
          <Form.Control
            id="password"
            type="password"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {values.passwordErr && (
            <p className="validation-message">
              {values.passwordErr}
            </p>
          )}
        </Col>
      </Form.Group>
      
      {/* Email */}
      <Form.Group as={Row} className="reg-form-inputs">
        <Form.Label column="true" sm="12" htmlFor="e-mail">
          E-Mail*:
        </Form.Label>
        <Col sm="10" md="5">
          <Form.Control
            id="e-mail"
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {values.emailErr && (
            <p className="validation-message">
              {values.emailErr}{' '}
            </p>
          )}
        </Col>
      </Form.Group>
      
      {/* Birthday */}
      <Form.Group className="mb-3 reg-form-inputs" as={Row}>
        <Form.Label
          column="true"
          sm="12"
          htmlFor="birthday">
          Birthday:
        </Form.Label>
        <Col sm="10" md="5">
          <Form.Control
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Col>
      </Form.Group>
      
      {/* Submit Button */}
      <Button
        type="button"
        className="mr-3"
        onClick={handleSubmit}>
        Sign Up
      </Button>
      
      {/* Log In Button */}
      <Button type="button" href="/">
        Log In
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};
