import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import app from "../../base";
import Form from "react-bootstrap/Form";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img className="brandLogo" src={require("./brand.jpg")} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link className="button" href="/">
              Logs
            </Nav.Link>

            <Nav.Link className="button" href="/map">
              Map
            </Nav.Link>
            <Nav.Link className="button" href="/charts">
              Charts
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Nav.Link
              className="d-flex"
              onClick={() => app.auth().signOut()}
              href="#"
            >
              <button className="logout-btn">Logout</button>
            </Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
