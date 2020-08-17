import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// actions
import { logout } from '../../actions/auth';
// components
import Pokedex from '../pokedex/Pokedex';
// styles
import './Navbar.scss';
import { Nav } from 'react-bootstrap';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Nav.Item>
        <Nav.Link>Pokedex</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Regions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <label htmlFor="gsearch">Search Pokemon:</label>
        <input type="search" id="gsearch" name="gsearch" />
      </Nav.Item>
      <Link to="/" onClick={logout}>
        Logout&nbsp;<i className="fas fa-sign-out-alt"></i>
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <div>
      <div className="pokedex-component">
        <Pokedex />
      </div>
      <div>
        Welcome
      </div>
    </div>
  );

  return (
    <Nav className="nav-container" defaultActiveKey="/">
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </Nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
