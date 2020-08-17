import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// actions
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
// style
import './Login.scss';
import pokemonLogo from '../../img/pogo-logo.png';


const Login = ({ setAlert, login, isAuthenticated, user }) => {
  const [ formData, setFormData ] = useState({
		name: '',
		password: ''
	});

	const { name, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (user) {
			setAlert(`Welcome`, 'success');
      login(name, password);
      console.log('LOGGED IN')
		} else {
			setAlert('Invalid Credentials', 'danger');
		}
	};

	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/homepage" />;
  }
  
  return (
    <div className="login-container">
      <img className="login-logo" src={pokemonLogo} />
      <Form className="login-form" onSubmit={(e) => onSubmit(e)}>
        <h1>LOGIN</h1>
        <FormGroup>
          {/* <Label htmlFor="exampleEmail">Trainer</Label> */}
          <Input 
            type="name" 
            name="name" 
            className="login-input" 
            placeholder="Enter Pokemon GO Trainer name"
            onChange={(e) => onChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          {/* <Label htmlFor="examplePassword">Password</Label> */}
          <Input 
            type="password" 
            name="password" 
            className="login-input"
            placeholder="Password" 
            onChange={(e) => onChange(e)}
            required
          />
        </FormGroup>
        <Button className="login-button" type="submit" value="Login">SUBMIT</Button>
      </Form>
        No account? <br /><Link to="/register" className="register">REGISTER</Link>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = ({ auth: { isAuthenticated, user }}) => ({
	isAuthenticated,
	user
})

export default connect(mapStateToProps, { 
	login,
	setAlert
})(Login);
