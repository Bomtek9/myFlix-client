import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Img from "../img/ghibli-logo.png";
import "./navbar.scss";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

function NavbarComponent({ user, onLoggedOut, movies, search, setSearch }) {
  // const handleSearch = (event) => {
  //   event.preventDefault();

  //   const getSearchedMovies = (arr, query) => {
  //     return arr.filter((movie) => {
  //       return movie.title.toLowerCase().includes(query.toLowerCase());
  //     });
  //   };
  //   console.log(getSearchedMovies(movies, search));
  // };

  return (
    <Navbar
      expand="lg"
      className=" mb-5 fixed-top justify-content-end navbar-style "
    >
      <Container className="align-bottom align-items-end align-content-end align-self-end navbar-style">
        {/* <Navbar.Brand href="#home"> */}
        <img
          alt=""
          src={Img}
          width="300px"
          height=""
          className="d-inline-block align-top"
        />

        <Navbar.Brand className="align-bottom navbar-style">
          Archive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto justify-content-end"> */}
          <Nav className=" justify-content-end d-flex flex-grow-1">
            {!user ? (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/signup">signup</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/movies">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login" onClick={onLoggedOut}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
                <Form className="d-flex navbar-style">
                  <Form.Control
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  {/* <Button
                  variant="outline-primary"
                  type="submit"
                  onClick={handleSearch}
                >
                  Search
                </Button> */}
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
