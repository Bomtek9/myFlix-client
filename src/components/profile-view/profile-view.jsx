import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";

const ProfileView = ({ user, token, movies, setUser }) => {
  //   const userBday = user.birthday.toDateString();
  //   console.log(token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && user.favoriteMovies) {
      // Use the user's ID or username to fetch favorite movies
      fetch(
        `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.Username}/favorites`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch favorite movies");
          }
        })
        .then((data) => {
          setFavoriteMovies(data);
        })
        .catch((error) => {
          console.error("Error fetching favorite movies:", error);
        });
    }
  }, [user, token]);

  //creates an array with all the movies

  let result = [];
  if (user.favoriteMovies) {
    result = movies.filter((m) => user.favoriteMovies.includes(m._id));
  }

  //UPDATING PROFILE INFOS
  const handleUpdate = (event) => {
    event.preventDefault();

    let data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    //DEBUG
    console.log(JSON.stringify(data));
    console.log(username);

    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        console.log("response:", response);
        if (response.ok) {
          alert("update successful");
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          const errorText = await response.text();
          // Read the response body as text
          console.log("Error response body:", errorText);
          alert("update failed");
        }
      })
      .catch((err) => console.log("error", err));
  };

  //DELETE ACCOUNT
  const deleteAccount = () => {
    fetch(
      `https://dup-movies-18ba622158fa.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        // setMovies(null);
        localStorage.clear();
        alert("your account has been deleted");
        window.location.replace("/login");
      } else {
        alert("could not delete account");
      }
    });
  };

  return (
    <>
      <Container className="">
        <Row className="justify-content-left">
          <Col md={8}>
            <CardGroup className="mt-5">
              <Card className="mb-5 border border-4 card-custom">
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  {/* <Card.Text>Please Sign Up</Card.Text> */}
                  <Form onSubmit={handleUpdate}>
                    <Form.Group>
                      <Form.Label>
                        username:
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          // required
                          placeholder={user.username}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        password:
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          // required
                          placeholder="*******"
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>
                        email:
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          // required
                          placeholder={user.email}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        birthday:
                        <Form.Control
                          type="date"
                          value={birthday}
                          onChange={(e) => {
                            setBirthday(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleUpdate}
                      className="text-white mt-4"
                    >
                      update profile
                    </Button>
                  </Form>
                  <Link to="/login">
                    <Button
                      variant="danger"
                      type=""
                      onClick={deleteAccount}
                      className="text-white mt-3"
                    >
                      delete account
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-md-center align-items-center">
          {favoriteMovies.map((movie) => {
            return (
              <Col
                key={movie._id}
                className="mb-4 justify-content-center align-items-center d-flex"
              >
                <MovieCard
                  movie={movie}
                  token={token}
                  setUser={setUser}
                  user={user}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default ProfileView;
