import React from 'react';
import { Nav } from 'react-bootstrap';

const Navbar = () => {
  return (
      <Nav className="nav" variant="pills" defaultActiveKey="/home">
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
      </Nav>
  )
}

export default Navbar;
