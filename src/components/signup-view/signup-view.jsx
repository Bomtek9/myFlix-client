import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Button, Row, Form, Card, Container, Col } from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length < 5) {
      setUsernameError("5 alphanumeric characters required");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 6) {
      setPasswordError("6 alphanumeric characters required");
      return;
    } else {
      setPasswordError("");
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://dup-movies-18ba622158fa.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          console.error(data); // Log the response body for debugging
          alert("Signup failed");
        }
      });
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card
            className="mx-auto"
            style={{ marginTop: 100, marginBottom: 50, width: "350px" }}
          >
            <Card.Header>Please Sign Up</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter a Username"
                  />
                  {usernameError && (
                    <span className="error">{usernameError}</span>
                  )}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter a Password"
                  />
                  {passwordError && (
                    <span className="error">{passwordError}</span>
                  )}
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter an Email"
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    placeholder="Select Birthday"
                  />
                </Form.Group>

                <Button
                  style={{ marginTop: 10 }}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
