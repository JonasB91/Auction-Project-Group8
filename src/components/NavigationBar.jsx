import React from "react";
import { Link } from 'react-router-dom';
import '../css/navigationbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = () => {

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="Auctions">All Auctions</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="CreateAuction">Add New Auction</Nav.Link>
            <Nav.Link href="ClosedAuction">Closed Auctions</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
 export default NavigationBar;