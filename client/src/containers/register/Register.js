import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// actions
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
// styles
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Register.scss';
import pokemonLogo from '../../img/pogo-logo.png';

const Register = ({ isAuthenticated, register, setAlert }) => {
  const [ formData, setFormData ] = useState({
		name: '',
		password: '',
		password2: ''
  });
  
  const { name, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords dont match', 'danger')
    } else {
      register({ name, password, password2 })
      console.log('Successfully registered');
    }
  }

	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/homepage" />;
	}
  
  return (
    <div className="register-container">
      <img className="register-logo" src={pokemonLogo} />
      <Form className="register-form" onSubmit={(e) => onSubmit(e)}>
      <h1>REGISTER</h1>
        <FormGroup>
          {/* <Label htmlFor="exampleEmail">Enter Pokemon Go Trainer name...</Label> */}
          <Input 
            className="register-input" 
            placeholder="Trainer Name"
            type="text"
            name="name"
            onChange={(e) => onChange(e)}
            value={name}
            // required 
          />
        </FormGroup>
        <FormGroup>
          {/* <Label htmlFor="examplePassword">Password</Label> */}
          <Input 
            className="register-input" 
            placeholder="Create Password"
            type="password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            // required 
          />
        </FormGroup>
        <FormGroup>
          {/* <Label htmlFor="examplePassword">Confirm Password</Label> */}
          <Input
            className="register-input" 
            placeholder="Confirm Password"
            type="password"
            name="password2"
            onChange={(e) => onChange(e)}
            value={password2}
            // required 
          />
        </FormGroup>
        <Button className="register-button" type="submit" value="Register">Submit</Button>
      </Form>
        Already registered?<br /><Link to="/" className="login">LOGIN</Link>
    </div>
  )
}

Register.propTypes = {
	isAuthenticated: PropTypes.bool,
	register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { 
	register,
	setAlert
})(Register);